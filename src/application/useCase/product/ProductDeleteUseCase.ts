import { inject, injectable } from "inversify";
import { IProductRepository } from "../../../domain/repository/IProductRepository";
import {IUseCase} from "../../interface/IUseCase"

@injectable()
export class ProductDeleteUseCase implements IUseCase{
    
    constructor(
        @inject('IProductRepository') private readonly productRepository:IProductRepository
    ){}

    async execute(idProduct : string) {
        return this.productRepository.deleteById(idProduct)
    }

}