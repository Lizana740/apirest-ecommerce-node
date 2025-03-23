import { injectable } from "inversify"
import { ReviewAddUseCase } from "../../application/useCase/ReviewAddUseCase"
import { ReviewGetAll } from "../../application/useCase/ReviewGetAll"
import { ReviewFilterUseCase } from "../../application/useCase/ReviewFilterUseCase"
import { ReviewGetByIdUseCase } from "../../application/useCase/ReviewGetByIdUseCase"
import { ReviewDeleteUseCase } from "../../application/useCase/ReviewDeleteUseCase"
import { ReviewDto } from "../../application/DTOs/ReviewDto"
import { Validate } from "../../../shared/infrastructure/utils/Validate"
import { makeErrorResponse, makeResponse } from "../../../shared/infrastructure/utils/makeResponses"
import { Request, Response } from "express"
import { ArrayFilter } from "../../../shared/application/DTOs/FilterParam"

@injectable()
export class ReviewController {
    constructor(
        private readonly reviewAddUC: ReviewAddUseCase,
        private readonly reviewGetAllUC: ReviewGetAll,
        private readonly reviewFilter: ReviewFilterUseCase,
        private readonly reviewGetById: ReviewGetByIdUseCase,
        private readonly reviewDeleteById:ReviewDeleteUseCase,
    ) {}

    async addReview(req: Request, res: Response) {
        try {
            const user_id = "66a6cba4e3e04760fea0ad7d"
            const params = {
                ...req.body,
            }

            const review: ReviewDto = Validate.validate(ReviewDto, params)
            const id = await this.reviewAddUC.execute(review)
            res.status(201).json(makeResponse({ id: id }))
        } catch (e: any) {
            res.status(401).json(makeErrorResponse(e))
        }
    }
    async getAllReviews(req: Request, res: Response) {
        try {
            const response = await this.reviewGetAllUC.execute()
            res.json(makeResponse(response))
        } catch (e) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async getByUserFilter(req: Request, res: Response) {
        try {
            const array: ArrayFilter = Validate.validate(ArrayFilter, req.body)
            const lis = await this.reviewFilter.execute(array)
            res.json(makeResponse(lis))
        } catch (error) {
            res.status(401).json(makeErrorResponse(error))
        }
    }

    async getReviewById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const review = await this.reviewGetById.execute(id)
            res.json(makeResponse(review))
        } catch (error) {
            res.status(401).json(makeErrorResponse(error))
        }
    }

    async deleteReviewById(req: Request, res: Response) {
        try {
            const {id} = req.params
            await this.reviewDeleteById.execute(id)
            res.json(makeResponse({}, "Review eliminada con éxito"))
        } catch (error) {
            res.status(401).json(makeErrorResponse(error))
        }
    }
}
