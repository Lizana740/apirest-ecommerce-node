import { inject, injectable } from "inversify";
import { IUseCase } from "../../../core/domain/interface/IUseCase";
import { IProductRepository } from "../../domain/repository/IProductRepository";

@injectable()
export class ProductDeleteUseCase implements IUseCase{
    
    constructor(
        @inject('IProductRepository') private readonly productRepository:IProductRepository
    ){}

    async execute(idProduct : string) {
        return this.productRepository.deleteProductById(idProduct)
    }

}