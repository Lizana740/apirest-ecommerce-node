import { inject, injectable } from "inversify"
import { IUseCase } from "../../interface/IUseCase"
import { IUserRepository } from "../../../domain/repository/IUserRepository"
import { EventBus } from "../../../domain/interface/EventBus"
import { CreateUsersEvent } from "../../../domain/event/CreateUserEvent"

@injectable()
export class UserGetAll implements IUseCase{

    constructor(
        @inject('IUserRepository') private readonly userRepository:IUserRepository,
        @inject('EventBus') private readonly eventBus:EventBus
    ){}

    async execute() {
        this.eventBus.publish(CreateUsersEvent)
        return await this.userRepository.getAll() 
    }
    
}