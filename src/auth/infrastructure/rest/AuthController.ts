import { inject, injectable } from "inversify"
import { Response, Request } from "express"
import { UserFilterUseCase } from "../../../user/application/useCases/UserFilterUseCase"
import { FormLogin } from "../../application/DTOs/FormLogin"
import { ArrayFilter } from "../../../shared/application/DTOs/FilterParam"
import bycrypt from "bcrypt"
import { UserNotFound } from "../../../user/application/exception/UserNotFound"
import jwt from "jsonwebtoken"
import { Validate } from "../../../shared/infrastructure/utils/Validate"
import { makeErrorResponse, makeResponse } from "../../../shared/infrastructure/utils/makeResponses"
import { IncorrectPassword } from "../../../shared/infrastructure/exceptions/IncorrectPassword"

@injectable()
export class AuthController {
	constructor(@inject(UserFilterUseCase) private userFilterUseCase: UserFilterUseCase) {}

	async login(req: Request, res: Response) {
		try {
			const form: FormLogin = Validate.validate(FormLogin, req.body)
			const arrayFilter: ArrayFilter = Validate.validate(ArrayFilter, {
				params: [
					{
						property: "email",
						value: form.email,
						operator: "$eq",
					},
				],
			})

			const user = await this.userFilterUseCase.execute(arrayFilter)
			if (user.length == 0) {
				throw new UserNotFound()
			}
			if (Array.isArray(user) && user.length != 1) {
				throw new Error("Finding the user returns more values")
			}
			const u = user[0]
			const hash = u.getPasswordHash.toString()
			const password = form.password

			const isValid = bycrypt.compareSync(password, hash)

			if (!isValid) {
				throw new IncorrectPassword()
			}
			const token = jwt.sign({ id: u._id }, process.env.JWT_KEY!, {
				expiresIn: "15m",
			})

			const token_refresh = jwt.sign({ id: u._id }, process.env.JWT_KEY_REFRESH!, {
				expiresIn: "1d",
			})
			res.cookie("token", token_refresh, {
				httpOnly: true,
				secure: true,
				sameSite: true,
				maxAge: 3600000 * 24,
			})
			res.json(makeResponse({ token }))
		} catch (e: any) {
			res.status(401).json(makeErrorResponse(e))
		}
	}

	async refreshToken(req: Request, res: Response) {
		try {
			const token = req.headers.cookie?.split("token=")[1] || undefined
			if (!token) {
                throw new Error("ErrorTokenValidity")
			} else {
				jwt.verify(token, process.env.JWT_KEY_REFRESH!, (err: any, decode: any) => {
					if (err) {
						throw err
					}
					const newToken = jwt.sign({ id: decode.id }, process.env.JWT_KEY!, {
						expiresIn: "15m",
					})
					res.json(makeResponse({ token:newToken }))
				})
			}
		} catch (e: any) {
			res.status(401).json(makeErrorResponse(e))
		}
	}
}
