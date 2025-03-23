import { error } from "console"
import { Response, Request, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

export class JwtMiddleware {
  constructor() {}

  verify(rolesPermitidos: Array<any> = [], renewExpiredToken: boolean = false) {
    return function (req: Request, res: Response, next: NextFunction) {
      try {
        const token = req.headers?.authorization?.split(" ")[1]
        if (!token) {
          return res.status(401).json({
            error: "Acceso denegado",
            message: "No se encuentra el token",
          })
        }

        jwt.verify(token, process.env.JWT_KEY!, (err, decode) => {
          if (err) {
            return res.status(401).json({
              error: "ErrorTokenValidity",
              message: "EL toke es invalido",
            })
          }
        })
      } catch (err) {
        return res.status(500).send({
          success: false,
          message: "Ocurrió un error al obtener/validar la sesión",
          token_error_code: "TOKEN_ERR",
        })
      }
      next()
    }
  }
}
