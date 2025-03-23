import { Category } from "../model/Category"
import {IRepository} from "../../../shared/domain/interface/IRepository"

export interface ICategoryRepository extends IRepository<Category, String>{
}