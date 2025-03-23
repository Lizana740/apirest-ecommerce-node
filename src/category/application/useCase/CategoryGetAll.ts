import { inject, injectable } from "inversify"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { ICategoryRepository } from "../../domain/repository/ICategoryRepository"

@injectable()
export class CategoryGetAll implements IUseCase {
    constructor(
        @inject("ICategoryRepository")
        private readonly categoryRepository: ICategoryRepository
    ) {}

    async execute() {
        return this.categoryRepository.getAll()
    }
}
