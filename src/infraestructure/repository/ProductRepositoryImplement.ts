import { inject, injectable } from "inversify"
import { ObjectId } from "mongodb"
import { MongoDB } from "../../../config/mongo.db"
import { Product } from "../../domain/entity/Product"
import {ARepositoryImplements} from "./ARepositoryImplements" 
import { NameCollection } from "../../../config/const"

@injectable()
export class ProductRepositoryImplement extends ARepositoryImplements<Product,String>{

    constructor(
        @inject(MongoDB) public m: MongoDB
    ){
        super(m)
        this.setNameCollection('product') 
    }
    
    formatPrimary(id: string) {
        return {
            _id: ObjectId.createFromHexString(id)
        }
    }
}