import { Category } from "../entity/Category"
import {IRepository} from "../interface/IRepository"

export interface ICategoryRepository extends IRepository<Category, String>{
}