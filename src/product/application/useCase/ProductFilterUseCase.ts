import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/domain/interface/IUseCase";
import { IProductRepository } from "../../domain/repository/IProductRepository";
import { ArrayFilter } from "../../../shared/application/DTOs/FilterParam";
@injectable()
export class ProductFilterUseCase implements IUseCase{

    constructor(
        @inject('IProductRepository') private readonly productRepository: IProductRepository
    ){}

    async execute(array: ArrayFilter): Promise<any> {


    }
}