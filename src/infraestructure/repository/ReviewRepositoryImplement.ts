import { inject, injectable } from "inversify"
import { MongoDB } from "../../../config/mongo.db"
import { ARepositoryImplements } from "./ARepositoryImplements"
import { ObjectId } from "mongodb"
import { NameCollection } from "../../../config/const"
import { Review } from "../../domain/entity/Review"

@injectable()
export class ReviewRepositoryImplement extends ARepositoryImplements<
    Review,
    String
> {
    constructor(@inject(MongoDB) private readonly v: MongoDB) {
        super(v, NameCollection.review)
    }

    mapperEntity(document: any): Review {
        const { _id, point, coment, user_id, product_id, date } = document

        return new Review(_id, point, coment, user_id, product_id, date)
    }

    formatPrimary(id: string) {
        return {
            _id: ObjectId.createFromHexString(id),
        }
    }
}
