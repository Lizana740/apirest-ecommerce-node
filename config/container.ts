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
import { UserFilterUseCase } from "../src/application/useCase/user/UserFilterUseCase"
import { AuthController } from "../src/infraestructure/rest/auth/AuthController"
import { UserUpdateUseCase } from "../src/application/useCase/user/UserUpdateUseCase"
import { CategoryRepositoryImplement } from "../src/infraestructure/repository/CategoryRepositoryImplement"
import { ICategoryRepository } from "../src/domain/repository/ICategoryRepository"
import { CategoryAddUseCase } from "../src/application/useCase/category/CategoryAddUseCase"
import { CategoryGetAll } from "../src/application/useCase/category/CategoryGetAll"
import { CategoryGetByIdUseCase } from "../src/application/useCase/category/CategoryGetByIdUseCase"
import { CategoryDeleteUseCase } from "../src/application/useCase/category/CategoryDeleteUseCase"
import { CategoryFilterUseCase } from "../src/application/useCase/category/CategoryFilterUseCase"
import { CategoryUpdateUseCase } from "../src/application/useCase/category/CategoryUpdateUseCase"
import { CategoryController } from "../src/infraestructure/rest/category/CategoryController"

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
container
    .bind<ICategoryRepository>("ICategoryRepository")
    .to(CategoryRepositoryImplement)

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
container.bind<UserFilterUseCase>(UserFilterUseCase).to(UserFilterUseCase)
container.bind<UserUpdateUseCase>(UserUpdateUseCase).to(UserUpdateUseCase)

//->>[CATEGORY]<<-/Category/
container.bind<CategoryAddUseCase>(CategoryAddUseCase).to(CategoryAddUseCase)
container.bind<CategoryGetAll>(CategoryGetAll).to(CategoryGetAll)
container
    .bind<CategoryGetByIdUseCase>(CategoryGetByIdUseCase)
    .to(CategoryGetByIdUseCase)
container
    .bind<CategoryDeleteUseCase>(CategoryDeleteUseCase)
    .to(CategoryDeleteUseCase)
container
    .bind<CategoryFilterUseCase>(CategoryFilterUseCase)
    .to(CategoryFilterUseCase)
container
    .bind<CategoryUpdateUseCase>(CategoryUpdateUseCase)
    .to(CategoryUpdateUseCase)

/***  DI CONTROLLER ***/
container.bind<ProductController>(ProductController).to(ProductController)
container.bind<UserController>(UserController).to(UserController)
container.bind<CategoryController>(CategoryController).to(CategoryController)
container.bind<AuthController>(AuthController).to(AuthController)

export default container
