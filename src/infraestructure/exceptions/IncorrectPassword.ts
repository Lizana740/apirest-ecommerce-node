export class IncorrectPassword extends Error{
    constructor(){
        super("IncorrectPassword")
        this.name = "IncorrectPassword"
        this.message = "the password is not valid"
    }
}