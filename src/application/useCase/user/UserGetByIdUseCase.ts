import { inject, injectable } from "inversify"
import { IUseCase } from "../../interface/IUseCase"
import { IUserRepository } from "../../../domain/repository/IUserRepository"
import { User } from "../../../domain/entity/User"

@injectable()
export class UserGetByIdUseCase implements IUseCase {
    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository
    ) {}

    async execute(idUser: string): Promise<User | null> {
        return await this.userRepository.getById(idUser)
    }
}
