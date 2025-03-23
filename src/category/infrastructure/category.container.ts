import { Container, ContainerModule, interfaces } from "inversify"
import { ICategoryRepository } from "../domain/repository/ICategoryRepository"
import { CategoryRepositoryImplement } from "./repository/CategoryRepositoryImplement"
import { CategoryAddUseCase } from "../application/useCase/CategoryAddUseCase"
import { CategoryGetAll } from "../application/useCase/CategoryGetAll"
import { CategoryGetByIdUseCase } from "../application/useCase/CategoryGetByIdUseCase"
import { CategoryDeleteUseCase } from "../application/useCase/CategoryDeleteUseCase"
import { CategoryFilterUseCase } from "../application/useCase/CategoryFilterUseCase"
import { CategoryUpdateUseCase } from "../application/useCase/CategoryUpdateUseCase"
import { CategoryController } from "./rest/CategoryController"

const moduleCategory = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICategoryRepository>("ICategoryRepository").to(
    CategoryRepositoryImplement
  )

  //->>[CATEGORY]<<-/Category/
  bind<CategoryAddUseCase>(CategoryAddUseCase).to(CategoryAddUseCase)
  bind<CategoryGetAll>(CategoryGetAll).to(CategoryGetAll)
  bind<CategoryGetByIdUseCase>(CategoryGetByIdUseCase).to(CategoryGetByIdUseCase)
  bind<CategoryDeleteUseCase>(CategoryDeleteUseCase).to(CategoryDeleteUseCase)
  bind<CategoryFilterUseCase>(CategoryFilterUseCase).to(CategoryFilterUseCase)
  bind<CategoryUpdateUseCase>(CategoryUpdateUseCase).to(CategoryUpdateUseCase)
  bind<CategoryController>(CategoryController).to(CategoryController)
})
export default moduleCategory
