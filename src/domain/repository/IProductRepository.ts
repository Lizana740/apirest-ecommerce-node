import { Product } from "../entity/Product"
import {IRepository} from "../interface/IRepository"

export interface IProductRepository extends IRepository<Product, String>{
    add(p:Product):Promise<void>
}