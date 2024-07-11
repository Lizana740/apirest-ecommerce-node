import { inject, injectable } from "inversify";
import { IUseCase } from "../../interface/IUseCase";
import { IProductRepository } from "../../../domain/repository/IProductRepository";

@injectable()
export class ProductGetByIdUseCase implements IUseCase{
    
    constructor(
        @inject('IProductRepository') private readonly productRepository: IProductRepository
    ){}

    async execute(idProduct:string) {
        return this.productRepository.getById(idProduct)
    }
}