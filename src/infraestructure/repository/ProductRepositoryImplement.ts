import { inject, injectable } from "inversify";
import { MongoDB } from "../../../config/mongo.db";
import { Product } from "../../domain/entity/Product";
import { ObjectId } from "mongodb";
import { IProductRepository } from "../../domain/repository/IProductRepository";

@injectable()
export class ProductRepositoryImplement implements IProductRepository{

    constructor(
        @inject(MongoDB) private readonly mongodb: MongoDB
    ){}

    async getProductById(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    async getAllProduct():Promise<Product[]> {
        const collection = this.mongodb.db.collection('product')
        const list = await collection.find().toArray()
        return list as any as Product[]
        
    }
    async deleteProductById(id: string): Promise<void> {
        const collection = this.mongodb.db.collection('product')
        throw new Error("No se puede elminar ")
        const product = await collection.deleteOne({_id:ObjectId.createFromHexString(id)})
        if(product.deletedCount){
            return 
        }
        
    }
    async updateProductById(product: Product): Promise<void> {
        throw new Error("Method not implemented.")
    }
    async addProduct(name: string, quantity: number, description: string): Promise<void> {
        const p = new Product(undefined,name, quantity, description)
        const collection = this.mongodb.db.collection('product')
        await collection.insertOne(p)
    }



}