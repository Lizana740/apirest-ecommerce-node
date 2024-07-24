import { makeErrorResponse, makeResponse } from "../../utils/makeResponses"
import { CategoryGetByIdUseCase } from "../../../application/useCase/category/CategoryGetByIdUseCase"
import { Validate } from "../../utils/Validate"
import { Response, Request } from "express"
import { CategoryDeleteUseCase } from "../../../application/useCase/category/CategoryDeleteUseCase"
import { CategoryAddUseCase } from "../../../application/useCase/category/CategoryAddUseCase"
import { CategoryGetAll } from "../../../application/useCase/category/CategoryGetAll"
import { injectable } from "inversify"
import { CategoryUpdateUseCase } from "../../../application/useCase/category/CategoryUpdateUseCase"
import { CategoryDto } from "../../../application/DTOs/CategoryDto"
import { NotFoundElement } from "../../exceptions/NotFoundElement"
import { clear } from "console"

@injectable()
export class CategoryController {
    constructor(
        private readonly categoryGetById: CategoryGetByIdUseCase,
        private readonly categoryDeleteUC: CategoryDeleteUseCase,
        private readonly categoryAddUC: CategoryAddUseCase,
        private readonly categoryGetAll: CategoryGetAll,
        private readonly categoryUpdate: CategoryUpdateUseCase
    ) {}

    async addCategory(req: Request, res: Response) {
        try {
            const category: CategoryDto = Validate.validate(
                CategoryDto,
                req.body
            )
            const id = await this.categoryAddUC.execute(category)
            res.status(201).json(makeResponse({ id: id }))
        } catch (e) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async getCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const category = await this.categoryGetById.execute(id)
            if (!category) {
                throw new NotFoundElement()
            }
            res.status(200).json(makeResponse(category))
        } catch (e) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async getAllCategory(req: Request, res: Response) {
        try {
            const response = await this.categoryGetAll.execute()
            res.json(makeResponse(response))
        } catch (e) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async deleteCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params
            await this.categoryDeleteUC.execute(id)
            res.json(makeResponse({ id }))
        } catch (e: any) {
            res.status(401).json(makeErrorResponse(e))
        }
    }

    async updateCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { params } = req.body
            const fields: { field: string; value: any }[] = params

            const category = await this.categoryGetById.execute(id)
            if (!category) {
                throw new NotFoundElement()
            }

            const setField = (
                field: string,
                fields: { field: string; value: any }[],
                value: any
            ) => {
                const a = fields.find((ev) => ev.field == field)
                return a ? a.value : value
            }

            let categoryDto = new CategoryDto()
            categoryDto.name = setField("name", fields, category.getName)
            categoryDto.description = setField("description", fields, category.getDescription)

            const dtoValid = Validate.validate(CategoryDto, categoryDto)
            category.setName = categoryDto.name
            await this.categoryUpdate.execute(id, category)

            res.status(201).json(makeResponse(dtoValid))
        } catch (error) {
            res.status(401).json(makeErrorResponse(error))
        }
    }
}
