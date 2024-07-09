import { User } from "../entity/User";

export interface IUserRepository {
    getUserById(id:number):User
    getAllUser():User[]
    deleteUserById(id:number):void
    updateUserById(user:User):void
}