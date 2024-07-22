import { inject, injectable } from "inversify";
import { User } from "../../domain/entity/User";
import { MongoDB } from "../../../config/mongo.db";
import { ARepositoryImplements } from "./ARepositoryImplements";
import { ObjectId } from "mongodb";

@injectable()
export class UserRepositoryImplement extends ARepositoryImplements<
  User,
  String
> {
  constructor(@inject(MongoDB) private readonly v: MongoDB) {
    super(v, "user");
  }

  formatPrimary(id: string) {
    return {
      _id: ObjectId.createFromHexString(id),
    };
  }
}
