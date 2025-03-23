import { makeErrorResponse, makeResponse } from "../../utils/makeResponses"
import { Validate } from "../../utils/Validate"
import { Response, Request } from "express"
import { injectable } from "inversify"
import { ReviewAddUseCase } from "../../../application/useCase/review/ReviewAddUseCase"
import { ReviewDto } from "../../../application/DTOs/ReviewDto"
import { ReviewGetAll } from "../../../application/useCase/review/ReviewGetAll"
import { ArrayFilter } from "../../../application/DTOs/FilterParam"
import { ReviewFilterUseCase } from "../../../application/useCase/review/ReviewFilterUseCase"
import { ReviewGetByIdUseCase } from "../../../application/useCase/review/ReviewGetByIdUseCase"
import { ReviewDeleteUseCase } from "../../../application/useCase/review/ReviewDeleteUseCase"

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
