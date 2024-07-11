import { inject, injectable } from "inversify"
import { IUseCase } from "../../interface/IUseCase"
import { IUserRepository } from "../../../domain/repository/IUserRepository"

@injectable()
export class UserGetAll implements IUseCase{

    constructor(
        @inject('IUserRepository') private readonly userRepository:IUserRepository
    ){}

    async execute() {
        return this.userRepository.getAll() 
    }
    
}