import { inject, injectable } from "inversify";
import { IUseCase } from "../../interface/IUseCase"
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { UserDto } from "../../../domain/DTOs/UserDto";
import { User } from "../../../domain/entity/User";

@injectable()
export class UserAddUseCase implements IUseCase{
    
    constructor(
        @inject('IUserRepository') private readonly userRepository:IUserRepository
    ){}

    async execute(userDto:UserDto) {
        const {name, lastName, email}= userDto
        const p = new User(undefined, name, lastName, email)
        return this.userRepository.add(p)
    }
}