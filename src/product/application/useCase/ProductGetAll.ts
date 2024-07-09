import { inject, injectable } from "inversify";
import { IUseCase } from "../../../core/domain/interface/IUseCase";
import { IProductRepository } from "../../domain/repository/IProductRepository";

@injectable()
export class ProductGetAll implements IUseCase{
    constructor(
        @inject('IProductRepository') private readonly productRepository:IProductRepository
    ){}

    async execute() {
        return this.productRepository.getAllProduct() 
    }
    
}