import { inject, injectable } from "inversify"
import { IProductRepository } from "../../../domain/repository/IProductRepository"
import { IUseCase } from "../../../../core/interfaces/IUseCase"

@injectable()
export class ProductGetAll implements IUseCase{
    constructor(
        @inject('IProductRepository') private readonly productRepository:IProductRepository
    ){}

    async execute() {
        return this.productRepository.getAllProduct() 
    }
    
}