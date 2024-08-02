import { inject, injectable } from "inversify"
import { IUseCase } from "../../interface/IUseCase"
import { IReviewRepository } from "../../../domain/repository/IReviewRepository"
import { ReviewDto } from "../../DTOs/ReviewDto"
import { Review } from "../../../domain/entity/Review"

@injectable()
export class ReviewGetByIdUseCase implements IUseCase {
    constructor(
        @inject("IReviewRepository")
        private readonly reviewRepository: IReviewRepository
    ) {}

    async execute(idReview: string): Promise<Review | null> {
        return await this.reviewRepository.getById(idReview)
    }
}
