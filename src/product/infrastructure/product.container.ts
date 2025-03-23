import { Container, ContainerModule, interfaces } from "inversify"
import { ProductRepositoryImplement } from "./repository/ProductRepositoryImplement"
import { IProductRepository } from "../domain/repository/IProductRepository"
import { ProductAddUseCase } from "../application/useCase/ProductAddUseCase"
import { ProductGetAll } from "../application/useCase/ProductGetAll"
import { ProductDeleteUseCase } from "../application/useCase/ProductDeleteUseCase"
import { ProductGetByIdUseCase } from "../application/useCase/ProductGetByIdUseCase"
import { ProductFilterUseCase } from "../application/useCase/ProductFilterUseCase"
import { ProductController } from "./rest/ProductController"

const moduleProduct = new ContainerModule((bind: interfaces.Bind) => {
  bind<IProductRepository>("IProductRepository").to(ProductRepositoryImplement)

  //->>[PRODUCT]<<-//
  bind<ProductAddUseCase>(ProductAddUseCase).to(ProductAddUseCase)
  bind<ProductGetAll>(ProductGetAll).to(ProductGetAll)
  bind<ProductDeleteUseCase>(ProductDeleteUseCase).to(ProductDeleteUseCase)
  bind<ProductGetByIdUseCase>(ProductGetByIdUseCase).to(ProductGetByIdUseCase)

  bind<ProductFilterUseCase>(ProductFilterUseCase).to(ProductFilterUseCase)

  bind<ProductController>(ProductController).to(ProductController)
})

export default moduleProduct
