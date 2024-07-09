import "reflect-metadata"
import { Container } from "inversify"
import {MongoDB} from "./mongo.db"

import { IProductRepository } from "../src/product/domain/repository/IProductRepository";
import {ProductRepositoryImplement} from "../src/product/infrastructure/repository/ProductRepositoryImplement"
import { ProductAddUseCase } from "../src/product/application/useCase/ProductAddUseCase";
import { ProductController } from "../src/product/infrastructure/rest/ProductController";
import { ProductGetAll } from "../src/product/application/useCase/ProductGetAll";
import { MongoClient } from "mongodb";
import { ProductDeleteUseCase } from "../src/product/application/useCase/ProductDeleteUseCase";


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