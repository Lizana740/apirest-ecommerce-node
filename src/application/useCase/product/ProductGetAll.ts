import { inject, injectable } from "inversify"
import { IProductRepository } from "../../../domain/repository/IProductRepository"
import { IUseCase } from "../../interface/IUseCase"

@injectable()
export class ProductGetAll implements IUseCase{
    constructor(
        @inject('IProductRepository') private readonly productRepository:IProductRepository
    ){}

    async execute() {
        return this.productRepository.getAll() 
    }
    
}