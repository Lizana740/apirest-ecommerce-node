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
import { baseContainer } from "../../shared/infrastructure/base.container"


  baseContainer.bind<ICategoryRepository>("ICategoryRepository").to(
    CategoryRepositoryImplement
  )

  //->>[CATEGORY]<<-/Category/
  baseContainer.bind<CategoryAddUseCase>(CategoryAddUseCase).to(CategoryAddUseCase)
  baseContainer.bind<CategoryGetAll>(CategoryGetAll).to(CategoryGetAll)
  baseContainer.bind<CategoryGetByIdUseCase>(CategoryGetByIdUseCase).to(CategoryGetByIdUseCase)
  baseContainer.bind<CategoryDeleteUseCase>(CategoryDeleteUseCase).to(CategoryDeleteUseCase)
  baseContainer.bind<CategoryFilterUseCase>(CategoryFilterUseCase).to(CategoryFilterUseCase)
  baseContainer.bind<CategoryUpdateUseCase>(CategoryUpdateUseCase).to(CategoryUpdateUseCase)
  baseContainer.bind<CategoryController>(CategoryController).to(CategoryController)

