import { injectable, inject } from "inversify"
import { DomainEventSubscriber } from "../../../shared/domain/interface/DomainEventSubscriber"
import { SendWelcomeEmail } from "../useCases/SendWelcomeEmail"
import { DomainEventClass } from "../../../shared/domain/interface/DomainEvent"
import { ClientCreatedDomainEvent } from "../../domain/event/ClientCreatedDomainEvent"

@injectable()
export class SendWelcomeEmailOnUserCreated implements DomainEventSubscriber<ClientCreatedDomainEvent> {
	public constructor(@inject(SendWelcomeEmail) private sendWelcomeEmail: SendWelcomeEmail) {}

	subscribedTo(): DomainEventClass {
		return ClientCreatedDomainEvent
	}

	async on(clientCreatedDomainEvent: ClientCreatedDomainEvent) {
		await this.sendWelcomeEmail.execute(clientCreatedDomainEvent.name, clientCreatedDomainEvent.email)
	}
}
