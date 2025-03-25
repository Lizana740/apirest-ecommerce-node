import { inject, injectable } from "inversify"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { IUserRepository } from "../../domain/repository/IUserRepository"
import { EventBus } from "../../../shared/domain/interface/EventBus"
import { UserCreatedDomainEvent } from "../../domain/event/UserCreatedDomainEvent"

@injectable()
export class UserGetAll implements IUseCase {
  constructor(
    @inject("IUserRepository") private readonly userRepository: IUserRepository,
    @inject("EventBus") private readonly evenBus: EventBus
  ) {}

  async execute() {
    const users = await this.userRepository.getAll()
    const event = new UserCreatedDomainEvent({
        aggregateId: "",
        name: "Francisco Lizana",
        email: "panxo.lizana0@gmail.cl",
      })
    this.evenBus.publish([event])

    return users 
  }
}
