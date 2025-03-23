export class CreateUsersEvent {
    readonly nameEveto: string
    constructor() {
        this.nameEveto = "CreateUsersEvent"
    }
    getNameEvent() {
        return "Soy el evento"    }
}