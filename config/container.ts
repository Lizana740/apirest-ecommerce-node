import "reflect-metadata"
import { Container } from "inversify"
import {MongoDB} from "./mongo.db"

import { IProductRepository } from "../src/domain/repository/IProductRepository"
import {ProductRepositoryImplement} from "../src/infraestructure/repository/ProductRepositoryImplement"
import { ProductGetAll } from "../src/application/useCase/product/ProductGetAll"
import { ProductController } from "../src/infraestructure/rest/product/ProductController"
import { ProductAddUseCase } from "../src/application/useCase/product/ProductAddUseCase"
import { ProductDeleteUseCase } from "../src/application/useCase/product/ProductDeleteUseCase"

const container = new Container()

/***  DI DATABASE ***/
container.bind<MongoDB>(MongoDB).toConstantValue(new MongoDB())

/***  DI REPOSITORY ***/
container.bind<IProductRepository>('IProductRepository').to(ProductRepositoryImplement)

/***  DI USECASE ***/
container.bind<ProductAddUseCase>(ProductAddUseCase).to(ProductAddUseCase)
container.bind<ProductGetAll>(ProductGetAll).to(ProductGetAll)
container.bind<ProductDeleteUseCase>(ProductDeleteUseCase).to(ProductDeleteUseCase)

/***  DI CONTROLLER ***/
container.bind<ProductController>(ProductController).to(ProductController)

export default container