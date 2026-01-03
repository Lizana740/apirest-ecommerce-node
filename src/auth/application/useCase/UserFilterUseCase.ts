import { IUseCase } from "../../../shared/domain/interface/IUseCase";
import { inject } from "inversify";
import { ArrayFilter } from "../../../shared/application/DTOs/FilterParam";
import { IUserRepository } from "../../domain /repository/IUserRepository";
import { UserProps } from "../../domain /model/User";
import { injectable } from "inversify";

@injectable()
export class UserFilterUseCase implements IUseCase {
    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository
    ) {}
    
    async execute(array: ArrayFilter): Promise<UserProps[]> {
       return await this.userRepository.filter(array.params)
    }
}
