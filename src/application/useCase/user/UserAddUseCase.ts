import { inject, injectable } from "inversify"
import { IUseCase } from "../../interface/IUseCase"
import { IUserRepository } from "../../../domain/repository/IUserRepository"
import { User } from "../../../domain/entity/User"

@injectable()
export class UserAddUseCase implements IUseCase {
    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository
    ) {}

    async execute(p: User) {
        return this.userRepository.add(p)
    }
}
