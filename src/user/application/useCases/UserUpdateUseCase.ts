import { inject, injectable } from "inversify"
import { User } from "../../domain/model/User"
import { IUserRepository } from "../../domain/repository/IUserRepository"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"

@injectable()
export class UserUpdateUseCase implements IUseCase {
    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository
    ) {}

    async execute(id: string, user: User): Promise<void> {
        return await this.userRepository.updateById(id, user)
    }
}
