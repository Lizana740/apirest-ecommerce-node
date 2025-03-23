import { Product } from "../model/Product"
import {IRepository} from "../../../shared/domain/interface/IRepository"

export interface IProductRepository extends IRepository<Product, String>{
}