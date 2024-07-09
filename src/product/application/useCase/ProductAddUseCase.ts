import { inject, injectable } from "inversify";
import { IUseCase } from "../../../core/domain/interface/IUseCase"
import { IProductRepository } from "../../domain/repository/IProductRepository"
import { ProductDto } from "../DTO/ProductDto"
import "reflect-metadata";

@injectable()
export class ProductAddUseCase implements IUseCase{
    
    constructor(
        @inject('IProductRepository') private readonly productRepository:IProductRepository
    ){}

    async execute(product:ProductDto) {
        const {name, quantity, description}= product
        this.productRepository.addProduct(name, quantity, description)
    }
}