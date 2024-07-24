import { inject, injectable } from "inversify"
import { IUseCase } from "../../interface/IUseCase"
import { ICategoryRepository } from "../../../domain/repository/ICategoryRepository"
import { Category } from "../../../domain/entity/Category"
import { CategoryDto } from "../../DTOs/CategoryDto"

@injectable()
export class CategoryAddUseCase implements IUseCase {
    constructor(
        @inject("ICategoryRepository")
        private readonly categoryRepository: ICategoryRepository
    ) {}

    async execute(category:CategoryDto) {
        return this.categoryRepository.add(category)
    }
}
