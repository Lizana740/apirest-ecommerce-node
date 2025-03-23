import { inject, injectable } from "inversify"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { IUserRepository } from "../../domain/repository/IUserRepository"
import { User } from "../../domain/model/User"

@injectable()
export class UserAddUseCase implements IUseCase {
    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository
        
    ) {}

    async execute(p: User) {
        const r = await this.userRepository.add(p)
        return r 
    }
}
