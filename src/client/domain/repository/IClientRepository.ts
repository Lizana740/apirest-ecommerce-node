import { IRepository } from "../../../shared/domain/interface/IRepository";
import { ClientProps } from "../model/Client";


export interface IClientRepository extends IRepository<ClientProps, Number>{
}