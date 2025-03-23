export class UserNotFound extends Error{
    constructor(){
        super("UserNotFound")
        this.message="the user has not been found"
        this.name= "UserNotFound"
    }
}