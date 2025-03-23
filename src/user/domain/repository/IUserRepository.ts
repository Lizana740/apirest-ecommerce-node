import { IRepository } from "../../../shared/domain/interface/IRepository";
import { User } from "../model/User";


export interface IUserRepository extends IRepository<User, String>{
}