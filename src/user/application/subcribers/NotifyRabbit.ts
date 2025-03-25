import { injectable } from "inversify"
import { DomainEventSubscriber } from "../../../shared/domain/interface/DomainEventSubscriber"
import { UserCreatedDomainEvent } from "../../domain/event/UserCreatedDomainEvent"
import { DomainEventClass } from "../../../shared/domain/interface/DomainEvent"

@injectable()
export class NotifyRabbit
  implements DomainEventSubscriber<UserCreatedDomainEvent>
{
  public constructor() {}

  subscribedTo(): Array<DomainEventClass> {
    return [UserCreatedDomainEvent]
  }

  async on(userCreatedDomainEvent: UserCreatedDomainEvent) {
    console.log("NOtificando Rabbit")
  }
}
