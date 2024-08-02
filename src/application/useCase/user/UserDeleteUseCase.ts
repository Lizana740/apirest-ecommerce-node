import { inject, injectable } from "inversify"
import { IUseCase } from "../../interface/IUseCase"
import { IUserRepository } from "../../../domain/repository/IUserRepository"

@injectable()
export class UserDeleteUseCase implements IUseCase {
    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository
    ) {}

    async execute(idUser: string) {
        return await this.userRepository.deleteById(idUser)
    }
}
