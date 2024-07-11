import { IRepository } from "../interface/IRepository"
import { User } from "../entity/User"

export interface IUserRepository extends IRepository<User, String>{
}