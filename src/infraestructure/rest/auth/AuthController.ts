import { makeErrorResponse, makeResponse } from "../../utils/makeResponses"
import { inject, injectable } from "inversify"
import { Response, Request } from "express"
import { UserFilterUseCase } from "../../../application/useCase/user/UserFilterUseCase"
import { FormLogin } from "../../../application/DTOs/FormLogin"
import { ArrayFilter } from "../../../application/DTOs/FilterParam"
import bycrypt from "bcrypt"
import { Validate } from "../../utils/Validate"
import { UserNotFound } from "../../exceptions/UserNotFound"
import { IncorrectPassword } from "../../exceptions/IncorrectPassword"
import jwt from 'jsonwebtoken';

@injectable()
export class AuthController {
    constructor(
        @inject(UserFilterUseCase) private userFilterUseCase: UserFilterUseCase
    ) {}

    async login(req: Request, res: Response) {
        try {
            const form: FormLogin = Validate.validate(FormLogin, req.body)
            const arrayFilter: ArrayFilter = {
                params: [
                    {
                        property: "email",
                        value: form.email,
                        operator: "$eq",
                    },
                ],
            }

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
            const token = jwt.sign({id:u._id}, process.env.JWT_KEY!,{ expiresIn: '1h' })
            res.json(makeResponse({ token: token }))
        } catch (e: any) {
            res.status(401).json(makeErrorResponse(e))
        }
    }
}
