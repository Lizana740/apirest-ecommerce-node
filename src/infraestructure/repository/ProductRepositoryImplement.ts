import { inject, injectable, optional } from "inversify"
import { ObjectId } from "mongodb"
import { MongoDB } from "../../../config/mongo.db"
import { ARepositoryImplements } from "./ARepositoryImplements"
import { Product } from "../../domain/entity/Product"
import { NameCollection } from "../../../config/const"

@injectable()
export class ProductRepositoryImplement extends ARepositoryImplements<
    Product,
    String
> {
    constructor(@inject(MongoDB) public m: MongoDB) {
        super(m, NameCollection.product)
    }

    formatPrimary(id: string) {
        return {
            _id: ObjectId.createFromHexString(id),
        }
    }

    mapperEntity(document: any): Product {
        const {
            _id,
            name,
            description,
            price,
            quantity,
            path,
            category,
            brand,
        } = document
        return new Product(
            _id,
            name,
            description,
            price,
            quantity,
            path,
            category,
            brand
        )
    }
}
