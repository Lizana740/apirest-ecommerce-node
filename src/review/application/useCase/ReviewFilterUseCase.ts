import { inject, injectable } from "inversify"
import { ArrayFilter } from "../../../shared/application/DTOs/FilterParam"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { IReviewRepository } from "../../domain/repository/IReviewRepository"
import { Review } from "../../domain/model/Review"

@injectable()
export class ReviewFilterUseCase implements IUseCase {
    constructor(
        @inject("IReviewRepository")
        private readonly reviewRepository: IReviewRepository
    ) {}

    async execute(params: ArrayFilter): Promise<Review[]> {
        const list = await this.reviewRepository.filter(params.params)
        return list
    }
}
