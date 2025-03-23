import { inject, injectable } from "inversify"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { IReviewRepository } from "../../domain/repository/IReviewRepository"
import { ReviewDto } from "../../../review/application/DTOs/ReviewDto"
import { Review } from "../../domain/model/Review"

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
