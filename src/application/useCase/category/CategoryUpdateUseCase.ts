import { inject, injectable } from "inversify"
import { Category } from "../../../domain/entity/Category"
import { ICategoryRepository } from "../../../domain/repository/ICategoryRepository"
import { IUseCase } from "../../interface/IUseCase"

@injectable()
export class CategoryUpdateUseCase implements IUseCase {
    constructor(
        @inject("ICategoryRepository")
        private readonly categoryRepository: ICategoryRepository
    ) {}

    execute(id: string, category: Category): Promise<void> {
        return this.categoryRepository.updateById(id, category)
    }
}
