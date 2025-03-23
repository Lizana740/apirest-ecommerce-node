export class NotFoundElement extends Error {
    constructor(){
        super()
        this.name = "NotFoundElement"
        this.message = "not found element"
    }
}