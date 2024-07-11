import { inject, injectable } from "inversify";
import { IUseCase } from "../../interface/IUseCase"
import { IProductRepository } from "../../../domain/repository/IProductRepository"
import { ProductDto } from "../../../application/DTOs/product/ProductDto"
import { Product } from "../../../domain/entity/Product";

@injectable()
export class ProductAddUseCase implements IUseCase{
    
    constructor(
        @inject('IProductRepository') private readonly productRepository:IProductRepository
    ){}

    async execute(product:ProductDto) {
        const {name, quantity, description}= product
        const p = new Product(undefined, name, quantity, description)
        return this.productRepository.add(p)
    }
}