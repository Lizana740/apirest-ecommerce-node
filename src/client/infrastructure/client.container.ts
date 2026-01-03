import { IClientRepository } from "../domain/repository/IClientRepository"
import { ClientRepositoryImplement } from "./repository/ClientRepositoryImplement"
import { ClientAddUseCase } from "../application/useCases/ClientAddUseCase"
import { ClientGetAll } from "../application/useCases/ClientGetAll"
import { ClientGetByIdUseCase } from "../application/useCases/ClientGetByIdUseCase"
import { ClientDeleteUseCase } from "../application/useCases/ClientDeleteUseCase"
import { ClientFilterUseCase } from "../application/useCases/ClientFilterUseCase"
import { ClientUpdateUseCase } from "../application/useCases/ClientUpdateUseCase"
import { ClientController} from "./rest/ClientController"
import { SendWelcomeEmail } from "../application/useCases/SendWelcomeEmail"
import { DomainEvent } from "../../shared/domain/interface/DomainEvent"
import { DomainEventSubscriber } from "../../shared/domain/interface/DomainEventSubscriber"
import { SendWelcomeEmailOnUserCreated } from "../application/subcribers/SendWelcomeEmailOnUserCreated"
import { NotifyRabbit } from "../application/subcribers/NotifyRabbit"
import { baseContainer } from "../../shared/infrastructure/base.container"

// Repository
baseContainer.bind<IClientRepository>("IClientRepository").to(ClientRepositoryImplement)

// UseCases
baseContainer.bind<ClientAddUseCase>(ClientAddUseCase).to(ClientAddUseCase)
baseContainer.bind<ClientGetAll>(ClientGetAll).to(ClientGetAll)
baseContainer.bind<ClientGetByIdUseCase>(ClientGetByIdUseCase).to(ClientGetByIdUseCase)
baseContainer.bind<ClientDeleteUseCase>(ClientDeleteUseCase).to(ClientDeleteUseCase)
baseContainer.bind<ClientFilterUseCase>(ClientFilterUseCase).to(ClientFilterUseCase)
baseContainer.bind<ClientUpdateUseCase>(ClientUpdateUseCase).to(ClientUpdateUseCase)
baseContainer.bind<SendWelcomeEmail>(SendWelcomeEmail).to(SendWelcomeEmail)

// Subscribers
baseContainer.bind<DomainEventSubscriber<DomainEvent>>("DomainEventSubscriber").to(SendWelcomeEmailOnUserCreated)
baseContainer.bind<DomainEventSubscriber<DomainEvent>>("DomainEventSubscriber").to(NotifyRabbit)

// Controller
baseContainer.bind<ClientController>(ClientController).to(ClientController)
