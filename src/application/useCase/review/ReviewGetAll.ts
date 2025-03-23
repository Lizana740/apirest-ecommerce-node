import { inject, injectable } from "inversify"
import { IUseCase } from "../../interface/IUseCase"
import { IReviewRepository } from "../../../domain/repository/IReviewRepository"
import { ReviewDto } from "../../DTOs/ReviewDto"

@injectable()
export class ReviewGetAll implements IUseCase {
    constructor(
        @inject("IReviewRepository")
        private readonly reviewRepository: IReviewRepository
    ) {}

    async execute() {
        const list = await this.reviewRepository.getAll()

        return list.map(
            (e) =>
                new ReviewDto(
                    e.getPoint,
                    e.getComent,
                    e.getUsert.toHexString(),
                    e.getProduct.toHexString()
                )
        )
    }
}
