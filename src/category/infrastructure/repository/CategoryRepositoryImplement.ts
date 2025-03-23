import { inject, injectable, optional } from "inversify"
import { ObjectId } from "mongodb"
import { ARepositoryImplements } from "../../../shared/infrastructure/repository/ARepositoryImplements"
import { MongoDB } from "../../../../config/mongo.db"
import { Category } from "../../domain/model/Category"
import { NameCollection } from "../../../../config/const"

@injectable()
export class CategoryRepositoryImplement extends ARepositoryImplements<
    Category,
    String
> {
    constructor(@inject(MongoDB) public m: MongoDB) {
        super(m, NameCollection.category)
    }

    formatPrimary(id: string) {
        return {
            _id: ObjectId.createFromHexString(id),
        }
    }

    mapperEntity(document: any): Category {
        const { _id, name, description } = document
        return new Category(_id, name, description)
    }
}
