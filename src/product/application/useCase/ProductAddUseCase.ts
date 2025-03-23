import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { IProductRepository } from "../../domain/repository/IProductRepository"
import { ProductDto } from "../DTOs/ProductDto"
import { Product } from "../../domain/model/Product";

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