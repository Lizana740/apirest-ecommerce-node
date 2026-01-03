import { injectable } from "inversify"
import { DomainEventSubscriber } from "../../../shared/domain/interface/DomainEventSubscriber"
import { ClientCreatedDomainEvent } from "../../domain/event/ClientCreatedDomainEvent"
import { DomainEventClass } from "../../../shared/domain/interface/DomainEvent"

@injectable()
export class NotifyRabbit implements DomainEventSubscriber<ClientCreatedDomainEvent> {
	public constructor() {}

	subscribedTo(): DomainEventClass {
		return ClientCreatedDomainEvent
	}

	async on(clientCreatedDomainEvent: ClientCreatedDomainEvent) {
		console.log("NOtificando Rabbit")
	}
}
