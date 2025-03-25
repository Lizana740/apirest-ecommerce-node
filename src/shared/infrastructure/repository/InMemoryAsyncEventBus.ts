import { injectable } from "inversify"
import { DomainEvent } from "../../domain/interface/DomainEvent"
import { EventEmitter } from "stream"
import { EventBus } from "../../domain/interface/EventBus"
import { DomainEventSubscribers } from "../../domain/interface/DomainEventSubscribers"

@injectable()
export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.map(event => this.emit(event.eventName, event))
  }

  addSubscribers(subscribers: DomainEventSubscribers) {
    subscribers.items.forEach(subscriber => {
      subscriber.subscribedTo().forEach(event => {
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber))
      })
    })
  }
}
