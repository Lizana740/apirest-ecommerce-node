import { inject, injectable } from "inversify"
import { IUseCase } from "../../interface/IUseCase"
import { ArrayFilter } from "../../DTOs/FilterParam"
import { IUserRepository } from "../../../domain/repository/IUserRepository"
import { User } from "../../../domain/entity/User"
@injectable()
export class UserFilterUseCase implements IUseCase {
    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository
    ) {}

    async execute(array: ArrayFilter): Promise<User[]> {
        return this.userRepository.filter(array.params)
    }
}
