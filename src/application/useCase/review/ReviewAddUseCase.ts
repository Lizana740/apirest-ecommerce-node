import { inject, injectable } from "inversify"
import { ReviewDto } from "../../DTOs/ReviewDto"
import { IUseCase } from "../../interface/IUseCase"
import { IReviewRepository } from "../../../domain/repository/IReviewRepository"
import { IUserRepository } from "../../../domain/repository/IUserRepository"
import { IProductRepository } from "../../../domain/repository/IProductRepository"
import { UserNotFound } from "../../exceptions/UserNotFound"
import { ProductNotFound } from "../../exceptions/ProductNotFound"
import { Review } from "../../../domain/entity/Review"

@injectable()
export class ReviewAddUseCase implements IUseCase {
    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        @inject("IProductRepository")
        private readonly productRepository: IProductRepository,
        @inject("IReviewRepository")
        private readonly reviewRepository: IReviewRepository
    ) {}

    async execute(reviewDto: ReviewDto): Promise<any> {
        const user = await this.userRepository.getById(reviewDto.user_id)
        if (!user) {
            throw new UserNotFound()
        }
        const product = await this.productRepository.getById(
            reviewDto.product_id
        )
        if (!product) {
            throw new ProductNotFound()
        }

        const newReview = new Review(
            null,
            reviewDto.point,
            reviewDto.coment,
            user._id,
            product._id,
            new Date()
        )

        return await this.reviewRepository.add(newReview)
    }
}
