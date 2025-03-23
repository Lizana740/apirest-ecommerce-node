import { inject, injectable } from "inversify"
import { User } from "../../domain/entity/User"
import { MongoDB } from "../../../config/mongo.db"
import { ARepositoryImplements } from "./ARepositoryImplements"
import { ObjectId } from "mongodb"
import { NameCollection } from "../../../config/const"

@injectable()
export class UserRepositoryImplement extends ARepositoryImplements<
    User,
    String
> {
    constructor(@inject(MongoDB) private readonly v: MongoDB) {
        super(v, NameCollection.user)
    }

    mapperEntity(document: any): User {
        const {
            _id,
            name,
            lastname,
            email,
            password_hash,
            address,
        } = document

        return new User(
            _id,
            name,
            lastname,
            email,
            password_hash,
            address
        )
    }

    formatPrimary(id: string) {
        return {
            _id: ObjectId.createFromHexString(id),
        }
    }
}
