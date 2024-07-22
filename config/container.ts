import "reflect-metadata"
import { Container } from "inversify"
import { MongoDB } from "./mongo.db"

import { IProductRepository } from "../src/domain/repository/IProductRepository"
import { ProductRepositoryImplement } from "../src/infraestructure/repository/ProductRepositoryImplement"
import { ProductGetAll } from "../src/application/useCase/product/ProductGetAll"
import { ProductController } from "../src/infraestructure/rest/product/ProductController"
import { ProductAddUseCase } from "../src/application/useCase/product/ProductAddUseCase"
import { ProductDeleteUseCase } from "../src/application/useCase/product/ProductDeleteUseCase"
import { ProductGetByIdUseCase } from "../src/application/useCase/product/ProductGetByIdUseCase"
import { IUserRepository } from "../src/domain/repository/IUserRepository"
import { UserRepositoryImplement } from "../src/infraestructure/repository/UserRepositoryImplement"
import { UserAddUseCase } from "../src/application/useCase/user/UserAddUseCase"
import { UserGetAll } from "../src/application/useCase/user/UserGetAll"
import { UserGetByIdUseCase } from "../src/application/useCase/user/UserGetByIdUseCase"
import { UserDeleteUseCase } from "../src/application/useCase/user/UserDeleteUseCase"
import { UserController } from "../src/infraestructure/rest/user/UserController"
import { ProductFilterUseCase } from "../src/application/useCase/product/ProductFilterUseCase"

const container = new Container()

/***  DI DATABASE ***/
container
    .bind<MongoDB>(MongoDB)
    .toConstantValue(new MongoDB(process.env.MONGODB ?? "error"))

/***  DI REPOSITORY ***/
container
    .bind<IProductRepository>("IProductRepository")
    .to(ProductRepositoryImplement)
container.bind<IUserRepository>("IUserRepository").to(UserRepositoryImplement)

/***  DI USE CASE ***/

//->>[PRODUCT]<<-//
container.bind<ProductAddUseCase>(ProductAddUseCase).to(ProductAddUseCase)
container.bind<ProductGetAll>(ProductGetAll).to(ProductGetAll)
container
    .bind<ProductDeleteUseCase>(ProductDeleteUseCase)
    .to(ProductDeleteUseCase)
container
    .bind<ProductGetByIdUseCase>(ProductGetByIdUseCase)
    .to(ProductGetByIdUseCase)
container
    .bind<ProductFilterUseCase>(ProductFilterUseCase)
    .to(ProductFilterUseCase)

//->>[USER]<<-/User/
container.bind<UserAddUseCase>(UserAddUseCase).to(UserAddUseCase)
container.bind<UserGetAll>(UserGetAll).to(UserGetAll)
container.bind<UserGetByIdUseCase>(UserGetByIdUseCase).to(UserGetByIdUseCase)
container.bind<UserDeleteUseCase>(UserDeleteUseCase).to(UserDeleteUseCase)

/***  DI CONTROLLER ***/
container.bind<ProductController>(ProductController).to(ProductController)
container.bind<UserController>(UserController).to(UserController)

export default container
