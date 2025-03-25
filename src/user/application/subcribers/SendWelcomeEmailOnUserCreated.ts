import { injectable, inject } from "inversify"
import { DomainEventSubscriber } from "../../../shared/domain/interface/DomainEventSubscriber"
import { UserCreatedDomainEvent } from "../../domain/event/UserCreatedDomainEvent"
import { SendWelcomeEmail } from "../useCases/SendWelcomeEmail"
import { DomainEventClass } from "../../../shared/domain/interface/DomainEvent"

@injectable()
export class SendWelcomeEmailOnUserCreated implements DomainEventSubscriber<UserCreatedDomainEvent> {
    public constructor(@inject(SendWelcomeEmail) private sendWelcomeEmail: SendWelcomeEmail) {}

    subscribedTo(): DomainEventClass {
        return UserCreatedDomainEvent
    }

    async on(userCreatedDomainEvent: UserCreatedDomainEvent) {
        await this.sendWelcomeEmail.execute(userCreatedDomainEvent.name, userCreatedDomainEvent.email)
    }
}
