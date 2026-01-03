
import { ClientGetByIdUseCase } from "../../application/useCases/ClientGetByIdUseCase"
import { Response, Request } from "express"
import { ClientDeleteUseCase } from "../../application/useCases/ClientDeleteUseCase"
import { ClientAddUseCase } from "../../application/useCases/ClientAddUseCase"
import { FormUserCreate } from "../../application/DTOs/FormUserCreate"
import { ClientGetAll } from "../../application/useCases/ClientGetAll"
import { injectable } from "inversify"
import bcrypt from "bcryptjs"
import { UserNotFound } from "../../application/exception/UserNotFound"
import { ClientDto } from "../../application/DTOs/ClientDto"
import { ClientUpdateUseCase } from "../../application/useCases/ClientUpdateUseCase"
import { NotFoundElement } from "../../../shared/infrastructure/exceptions/NotFoundElement"
import { Validate } from "../../../shared/infrastructure/utils/Validate"
import { makeErrorResponse, makeResponse } from "../../../shared/infrastructure/utils/makeResponses"
import { ClientProps } from "../../domain/model/Client"

@injectable()
export class ClientController {
    constructor(
        private readonly clientGetById: ClientGetByIdUseCase,
        private readonly clientDeleteUC: ClientDeleteUseCase,
        private readonly clientAddUC: ClientAddUseCase,
        private readonly clientGetAll: ClientGetAll,
        private readonly clientUpdate: ClientUpdateUseCase
    ) {}

    async addClient(req: Request, res: Response) {
        try {
            const form: FormUserCreate = Validate.validate(
                FormUserCreate,
                req.body
            )
            
            const salt = bcrypt.genSaltSync(10)
            const password_hash = bcrypt.hashSync(form.password, salt)

            const newForm: ClientProps = {
                ...form,
                password_hash,
                _id:null
            }
            const client = await this.clientAddUC.execute(newForm)
            res.status(201).json(makeResponse({ id: 0 }))
        } catch (e) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async getClientById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const p = await this.clientGetById.execute(Number(id))
            if(!p){
                throw new NotFoundElement()
            }
            res.status(200).json(makeResponse(p))
        } catch (e) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async getAllClient(req: Request, res: Response) {
        try {
            const response = await this.clientGetAll.execute()
            res.json(makeResponse(response))
        } catch (e) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async deleteClientById(req: Request, res: Response) {
        try {
            const { id } = req.params
            await this.clientDeleteUC.execute(Number(id))
            res.json(makeResponse({ id: 0 }))
        } catch (e: any) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async updateClientById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { params } = req.body
            const fields: { field: string; value: any }[] = params

            const client = await this.clientGetById.execute(Number(id))
            if (!client) {
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

            let clientDto = new ClientDto()
            clientDto.name = setField("name", fields, client.name)
            clientDto.last_name = setField("last_name", fields, client.last_name)
            clientDto.email = setField("email", fields, client.email)
            clientDto.address = setField("address", fields, client.address)

            const dtoValid = Validate.validate(ClientDto, clientDto)
            
            client.name = clientDto.name
            client.last_name = clientDto.last_name
            client.email = clientDto.email
            client.address = clientDto.address
            await this.clientUpdate.execute(Number(id), client)

            res.status(201).json(makeResponse(dtoValid))
        } catch (error) {
            res.status(401).json(makeErrorResponse(error))
        }
    }
}
