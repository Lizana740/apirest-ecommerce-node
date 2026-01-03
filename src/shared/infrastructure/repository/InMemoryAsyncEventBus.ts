import { injectable } from "inversify"
import { DomainEvent } from "../../domain/interface/DomainEvent"
import { EventEmitter } from "stream"
import { EventBus } from "../../domain/interface/EventBus"
import { DomainEventSubscribers } from "../../domain/interface/DomainEventSubscribers"
import { DomainEventSubscriber } from "../../domain/interface/DomainEventSubscriber"

@injectable()
export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach(event => this.emit(event.eventName, event))
  }

  addSubscribers(subscribers: DomainEventSubscribers) {
    subscribers.items.forEach((subscriber:DomainEventSubscriber<DomainEvent>) => {
      this.on(
        subscriber.subscribedTo().EVENT_NAME, 
        subscriber.on.bind(subscriber))
    })
  }
}
