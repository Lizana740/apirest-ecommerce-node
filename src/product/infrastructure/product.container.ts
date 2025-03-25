import { ProductRepositoryImplement } from "./repository/ProductRepositoryImplement"
import { IProductRepository } from "../domain/repository/IProductRepository"
import { ProductAddUseCase } from "../application/useCase/ProductAddUseCase"
import { ProductGetAll } from "../application/useCase/ProductGetAll"
import { ProductDeleteUseCase } from "../application/useCase/ProductDeleteUseCase"
import { ProductGetByIdUseCase } from "../application/useCase/ProductGetByIdUseCase"
import { ProductFilterUseCase } from "../application/useCase/ProductFilterUseCase"
import { ProductController } from "./rest/ProductController"
import { baseContainer } from "../../shared/infrastructure/base.container"

baseContainer.bind<IProductRepository>("IProductRepository").to(ProductRepositoryImplement)


baseContainer.bind<ProductAddUseCase>(ProductAddUseCase).to(ProductAddUseCase)
baseContainer.bind<ProductGetAll>(ProductGetAll).to(ProductGetAll)
baseContainer.bind<ProductDeleteUseCase>(ProductDeleteUseCase).to(ProductDeleteUseCase)
baseContainer.bind<ProductGetByIdUseCase>(ProductGetByIdUseCase).to(ProductGetByIdUseCase)

baseContainer.bind<ProductFilterUseCase>(ProductFilterUseCase).to(ProductFilterUseCase)

baseContainer.bind<ProductController>(ProductController).to(ProductController)
