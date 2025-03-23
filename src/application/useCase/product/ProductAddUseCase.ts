import { inject, injectable } from "inversify";
import { IUseCase } from "../../interface/IUseCase"
import { IProductRepository } from "../../../domain/repository/IProductRepository"
import { ProductDto } from "../../DTOs/product/ProductDto"
import { Product } from "../../../domain/entity/Product";

@injectable()
export class ProductAddUseCase implements IUseCase{
    
    constructor(
        @inject('IProductRepository') private readonly productRepository:IProductRepository
    ){}

    async execute(product:ProductDto) {
        const {name, quantity, description,price}= product
        const p = new Product(null, name,description,price,quantity,"","","")
        return this.productRepository.add(p)
    }
}