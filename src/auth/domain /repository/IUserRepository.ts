
import { IRepository } from "../../../shared/domain/interface/IRepository";
import { UserProps } from "../model/User";

export interface IUserRepository extends IRepository<UserProps, String> {
}
