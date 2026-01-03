
import { UserProps } from "../../domain /model/User";
import { inject, injectable } from "inversify";
import { DB } from "../../../shared/infrastructure/postgre.db";
import { ARepositoryDBImpement } from "../../../shared/infrastructure/repository/ARepositoryDBImpement";

@injectable()
export class UserRepositoryImplement extends ARepositoryDBImpement<UserProps, String> {
    constructor(
       @inject(DB) private readonly db:DB
    ) {
        super(db, 'client', ['name', 'last_name', 'email', 'password_hash'])
    }

    mapperEntity(document: any): UserProps {
        return {
            _id: document.id,
            name: document.name,
            last_name: document.last_name,
            email: document.email,
            password_hash: document.password_hash
        }
    }

}