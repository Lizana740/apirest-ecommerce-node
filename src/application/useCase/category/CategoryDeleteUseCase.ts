import { inject, injectable } from "inversify"
import { IUseCase } from "../../interface/IUseCase"
import { ICategoryRepository } from "../../../domain/repository/ICategoryRepository"

@injectable()
export class CategoryDeleteUseCase implements IUseCase {
    constructor(
        @inject("ICategoryRepository")
        private readonly categoryRepository: ICategoryRepository
    ) {}

    async execute(id: string) {
        return this.categoryRepository.deleteById(id)
    }
}
