import { EventEmitter } from "events"
import { EventBus } from "../../domain/interface/EventBus"

export class EventBusImpl implements EventBus {
  private eventEmitter: EventEmitter

  constructor() {
    this.eventEmitter = new EventEmitter()
  }

  publish<T extends Object>(event: T) {
    const eventName = event.constructor.name
    this.eventEmitter.emit(eventName, event)
  }

  subscribe<T extends Function,E extends Object>(event: T, callback: (event: E) => void) {
    const eventName = event.name
    this.eventEmitter.on(eventName, callback)
  }
}
