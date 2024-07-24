import { inject, injectable } from "inversify"
import { IUseCase } from "../../interface/IUseCase"
import { ArrayFilter } from "../../DTOs/FilterParam"
import { ICategoryRepository } from "../../../domain/repository/ICategoryRepository"
import { Category } from "../../../domain/entity/Category"

@injectable()
export class CategoryFilterUseCase implements IUseCase {
    constructor(
        @inject("ICategoryRepository")
        private readonly categoryRepository: ICategoryRepository
    ) {}

    async execute(array: ArrayFilter): Promise<Category[]> {
        return this.categoryRepository.filter(array.params)
    }
}
