import { inject, injectable } from "inversify"
import { IProductRepository } from "../../../domain/repository/IProductRepository"
import { IUseCase } from "../../interface/IUseCase"
import { EventBus } from "../../../domain/interface/EventBus"
import { CreateUsersEvent } from "../../../domain/event/CreateUserEvent"

@injectable()
export class ProductGetAll implements IUseCase{
    constructor(
        @inject('IProductRepository') private readonly productRepository:IProductRepository,
        @inject('EventBus') private readonly eventBus: EventBus
    ){}

    async execute() {
        this.eventBus.publish(new CreateUsersEvent())
        return this.productRepository.getAll() 
    }
    
}