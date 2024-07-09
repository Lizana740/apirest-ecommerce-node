import { Product } from "../entity/Product";

export interface IProductRepository {
    getProductById(id:number):Promise<Product>
    getAllProduct():Promise<Product[]>
    deleteProductById(id:string):Promise<void>
    updateProductById(product:Product):Promise<void>
    addProduct(
        name:string,
        quantity:number,
        description:string):Promise<void>
}