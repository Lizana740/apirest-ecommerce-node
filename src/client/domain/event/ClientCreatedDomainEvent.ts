import { DomainEvent } from "../../../shared/domain/interface/DomainEvent"

type ClientCreatedDomainEventAttributes = {
	readonly name: string
	readonly email: string
}

export class ClientCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = "client.created"
	readonly name: string
	readonly email: string

	constructor({
		aggregateId,
		name,
		email,
		eventId,
		occurredOn,
	}: {
		aggregateId: string
		eventId?: string
		name: string
		email: string
		occurredOn?: Date
	}) {
		super({ eventName: ClientCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn })
		this.name = name
		this.email = email
	}

	static fromPrimitives(params: {
		aggregateId: string
		attributes: ClientCreatedDomainEventAttributes
		eventId: string
		occurredOn: Date
	}): DomainEvent {
		const { aggregateId, attributes, occurredOn, eventId } = params
		return new ClientCreatedDomainEvent({
			aggregateId,
			name: attributes.name,
			email: attributes.email,
			eventId,
			occurredOn,
		})
	}

	toPrimitives(): ClientCreatedDomainEventAttributes {
		const { name, email } = this
		return {
			name,
			email,
		}
	}
}
