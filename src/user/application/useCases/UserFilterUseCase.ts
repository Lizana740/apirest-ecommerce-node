import { inject, injectable } from "inversify"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { ArrayFilter } from "../../../shared/application/DTOs/FilterParam"
import { IUserRepository } from "../../domain/repository/IUserRepository"
import { User } from "../../domain/model/User"
@injectable()
export class UserFilterUseCase implements IUseCase {
    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository
    ) {}

    async execute(array: ArrayFilter): Promise<User[]> {
        return await this.userRepository.filter(array.params)
    }
}
