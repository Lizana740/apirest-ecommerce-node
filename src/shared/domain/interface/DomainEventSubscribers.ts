import { Container } from "inversify"
import { DomainEvent } from "./DomainEvent"
import { DomainEventSubscriber } from "./DomainEventSubscriber"

export class DomainEventSubscribers {
    private constructor(public items: Array<DomainEventSubscriber<DomainEvent>>) { }
  
    static from(container: Container): DomainEventSubscribers {
      const subscriberDefinitions = container.getAll<DomainEventSubscriber<DomainEvent>>("DomainEventSubscriber")
      const subscribers: Array<DomainEventSubscriber<DomainEvent>> = []
  
      subscriberDefinitions.forEach((domainEventSubscriber: any) => {
        subscribers.push(domainEventSubscriber)
      })
  
      return new DomainEventSubscribers(subscribers)
    }
  }