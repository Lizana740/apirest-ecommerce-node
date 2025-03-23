import { injectable, inject } from "inversify"
import { CreateUsersEvent } from "../../domain/event/CreateUserEvent"
import { EventBus } from "../../domain/interface/EventBus"

@injectable()
export class CreateUserNotifierEmail {
  constructor(@inject("EventBus") private eventBus: EventBus) {
    this.eventBus.subscribe(CreateUsersEvent, this.handleUserCreated)
  }

  private handleUserCreated(event: CreateUsersEvent): void {
    console.log(`✅ Usuario creado: ${event.nameEveto}, enviando email a ${event.getNameEvent()}`)
  }
}
