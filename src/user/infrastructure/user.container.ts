import { IUserRepository } from "../domain/repository/IUserRepository"
import { UserRepositoryImplement } from "./repository/UserRepositoryImplement"
import { UserAddUseCase } from "../application/useCases/UserAddUseCase"
import { UserGetAll } from "../application/useCases/UserGetAll"
import { UserGetByIdUseCase } from "../application/useCases/UserGetByIdUseCase"
import { UserDeleteUseCase } from "../application/useCases/UserDeleteUseCase"
import { UserFilterUseCase } from "../application/useCases/UserFilterUseCase"
import { UserUpdateUseCase } from "../application/useCases/UserUpdateUseCase"
import { UserController } from "./rest/UserController"
import { SendWelcomeEmail } from "../application/useCases/SendWelcomeEmail"
import { DomainEvent } from "../../shared/domain/interface/DomainEvent"
import { DomainEventSubscriber } from "../../shared/domain/interface/DomainEventSubscriber"
import { SendWelcomeEmailOnUserCreated } from "../application/subcribers/SendWelcomeEmailOnUserCreated"
import { NotifyRabbit } from "../application/subcribers/NotifyRabbit"
import { baseContainer } from "../../shared/infrastructure/base.container"

// Repository
baseContainer
  .bind<IUserRepository>("IUserRepository")
  .to(UserRepositoryImplement)

// UseCases
baseContainer.bind<UserAddUseCase>(UserAddUseCase).to(UserAddUseCase)
baseContainer.bind<UserGetAll>(UserGetAll).to(UserGetAll)
baseContainer
  .bind<UserGetByIdUseCase>(UserGetByIdUseCase)
  .to(UserGetByIdUseCase)
baseContainer.bind<UserDeleteUseCase>(UserDeleteUseCase).to(UserDeleteUseCase)
baseContainer.bind<UserFilterUseCase>(UserFilterUseCase).to(UserFilterUseCase)
baseContainer.bind<UserUpdateUseCase>(UserUpdateUseCase).to(UserUpdateUseCase)
baseContainer.bind<SendWelcomeEmail>(SendWelcomeEmail).to(SendWelcomeEmail)

// Subscribers
baseContainer
  .bind<DomainEventSubscriber<DomainEvent>>("DomainEventSubscriber")
  .to(SendWelcomeEmailOnUserCreated)
baseContainer
  .bind<DomainEventSubscriber<DomainEvent>>("DomainEventSubscriber")
  .to(NotifyRabbit)

// Controller
baseContainer.bind<UserController>(UserController).to(UserController)
