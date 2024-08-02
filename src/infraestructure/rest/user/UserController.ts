import { makeErrorResponse, makeResponse } from "../../utils/makeResponses"
import { UserGetByIdUseCase } from "../../../application/useCase/user/UserGetByIdUseCase"
import { Validate } from "../../utils/Validate"
import { Response, Request, response } from "express"
import { UserDeleteUseCase } from "../../../application/useCase/user/UserDeleteUseCase"
import { ValidationError } from "../../exceptions/ValidationError"
import { UserAddUseCase } from "../../../application/useCase/user/UserAddUseCase"
import { FormUserCreate } from "../../../application/DTOs/FormUserCreate"
import { UserGetAll } from "../../../application/useCase/user/UserGetAll"
import { injectable } from "inversify"
import { User } from "../../../domain/entity/User"
import bcrypt from "bcrypt"
import { UserNotFound } from "../../../application/exceptions/UserNotFound"
import { UserDto } from "../../../application/DTOs/UserDto"
import { UserUpdateUseCase } from "../../../application/useCase/user/UserUpdateUseCase"
import { MongoServerError } from "mongodb"
import { NotFoundElement } from "../../exceptions/NotFoundElement"

@injectable()
export class UserController {
    constructor(
        private readonly userGetById: UserGetByIdUseCase,
        private readonly userDeleteUC: UserDeleteUseCase,
        private readonly userAddUC: UserAddUseCase,
        private readonly userGetAll: UserGetAll,
        private readonly userUpdate: UserUpdateUseCase
    ) {}

    async addUser(req: Request, res: Response) {
        try {
            const form: FormUserCreate = Validate.validate(
                FormUserCreate,
                req.body
            )
            const salt = bcrypt.genSaltSync()
            const password_hash = bcrypt.hashSync(form.password, salt)

            const p = new User(
                null,
                form.name,
                form.lastname,
                form.email,
                password_hash,
                form.address
            )
            const id = await this.userAddUC.execute(p)
            res.status(201).json(makeResponse({ id: id }))
        } catch (e) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const p = await this.userGetById.execute(id)
            if(!p){
                throw new NotFoundElement()
            }
            res.status(200).json(makeResponse(p))
        } catch (e) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async getAllUser(req: Request, res: Response) {
        try {
            const response = await this.userGetAll.execute()
            res.json(makeResponse(response))
        } catch (e) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async deleteUserById(req: Request, res: Response) {
        try {
            const { id } = req.params
            await this.userDeleteUC.execute(id)
            res.json(makeResponse({ id }))
        } catch (e: any) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async updateUserById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { params } = req.body
            const fields: { field: string; value: any }[] = params

            const user = await this.userGetById.execute(id)
            if (!user) {
                throw new UserNotFound()
            }

            const setField = (
                field: string,
                fields: { field: string; value: any }[],
                value: any
            ) => {
                const a = fields.find((ev) => ev.field == field)
                return a ? a.value : value
            }

            let userDto = new UserDto()
            userDto.name = setField("name", fields, user.getName)
            userDto.lastname = setField("lastname", fields, user.getLastname)
            userDto.email = setField("email", fields, user.getEmail)
            userDto.address = setField("address", fields, user.getAddress)

            const dtoValid = Validate.validate(UserDto, userDto)
            user.setName = userDto.name
            user.setLastname = userDto.lastname
            user.setEmail = userDto.email
            user.setAddress = userDto.address
            await this.userUpdate.execute(id, user)

            res.status(201).json(makeResponse(dtoValid))
        } catch (error) {
            res.status(401).json(makeErrorResponse(error))
        }
    }
}
