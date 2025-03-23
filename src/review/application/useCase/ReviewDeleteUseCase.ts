import { inject, injectable } from "inversify";
import { IProductRepository } from "../../../product/domain/repository/IProductRepository";
import {IUseCase} from "../../../shared/domain/interface/IUseCase"
import { IReviewRepository } from "../../domain/repository/IReviewRepository";

@injectable()
export class ReviewDeleteUseCase implements IUseCase{
    
    constructor(
        @inject('IReviewRepository') private readonly reviewRepository:IReviewRepository
    ){}

    async execute(idProduct : string) {
        return this.reviewRepository.deleteById(idProduct)
    }

}