import { DomainEvent } from "./DomainEvent"
import { DomainEventSubscribers } from "./DomainEventSubscribers"

export interface EventBus {
  publish(events: Array<DomainEvent>): void
  addSubscribers(subscribers: DomainEventSubscribers): void
}