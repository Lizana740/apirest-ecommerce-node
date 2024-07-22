import { Response, Request } from "express"
import { injectable } from "inversify"
import { UserAddUseCase } from "../../../application/useCase/user/UserAddUseCase"
import { UserGetAll } from "../../../application/useCase/user/UserGetAll"
import { UserDeleteUseCase } from "../../../application/useCase/user/UserDeleteUseCase"
import { UserGetByIdUseCase } from "../../../application/useCase/user/UserGetByIdUseCase"
import { UserDto } from "../../../domain/DTOs/UserDto"

@injectable()
export class UserController {
  constructor(
    private readonly userAddUC: UserAddUseCase,
    private readonly userGetAll: UserGetAll,
    private readonly userDeleteUC: UserDeleteUseCase,
    private readonly userGetById: UserGetByIdUseCase
  ) {}

  async addUser(req: Request, res: Response) {
    try {
      const userDto = req.body as UserDto
      await this.userAddUC.execute(userDto)
      res.send("OK")
    } catch (e) {
      console.error("Error", e)
      res.status(401).send("Error")
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const p = await this.userGetById.execute(id)
      res.json(p)
    } catch (e) {
      console.error("Error")
      res.status(401).send("Error")
    }
  }

  async getAllUser(req: Request, res: Response) {
    try {
      const response = await this.userGetAll.execute()
      res.send(response)
    } catch (e) {
      console.error("Error")
      res.status(401).send("Error")
    }
  }

  async deleteUserById(req: Request, res: Response) {
    try {
      const { id } = req.params
      await this.userDeleteUC.execute(id)
      res.send(`delete: id => ${id}`)
    } catch (e: any) {
      const json = {
        message: e.message,
      }
      res.status(401).json(json)
    }
  }
}
