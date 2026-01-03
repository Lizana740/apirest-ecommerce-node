import { AuthController } from "./rest/AuthController"
import { baseContainer } from "../../shared/infrastructure/base.container"
import { IUserRepository } from "../domain /repository/IUserRepository"
import { UserRepositoryImplement } from "./repository/UserRespositoryImplement"
import { UserFilterUseCase } from "../application/useCase/UserFilterUseCase"

// Repository
baseContainer.bind<IUserRepository>("IUserRepository").to(UserRepositoryImplement)

// UseCases
baseContainer.bind<UserFilterUseCase>(UserFilterUseCase).to(UserFilterUseCase)

// Controller
baseContainer.bind<AuthController>(AuthController).to(AuthController)

