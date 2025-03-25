import { Response, Request, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

export class JwtMiddleware {
	constructor() {}

	static verify(rolesPermitidos: Array<any> = [], renewExpiredToken: boolean = false) {
		return function (req: Request, res: Response, next: NextFunction) {
			try {
				const token = req.headers?.authorization?.split(" ")[1] || undefined
				if (!token || token == undefined) {
					res.status(401).json({
						error: "Acceso denegado",
						message: "No se encuentra el token",
					})
				} else {
					jwt.verify(token, process.env.JWT_KEY!, (err, decode) => {
						if (err) {
							throw new Error("ErrorTokenValidity")
						}
						next()
					})
				}
			} catch (err) {
				res.status(500).send({
					success: false,
					message: "Ocurrió un error al obtener/validar la sesión",
					token_error_code: "TOKEN_ERR",
				})
			}
		}
	}
}
