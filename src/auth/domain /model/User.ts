import { IAggregateRoot } from "../../../shared/domain/interface/IAggregateRoot"

class User {
    constructor(
        public _id: string,
        private name: string = "",
        private last_name: string = "",
        private email: string = "",
        private password_hash: string = "",
    ) { }

}

export type UserProps = {
    _id: string,
    name: string,
    last_name: string,
    email: string,
    password_hash: string,
}

export class AggregateUser implements IAggregateRoot<User, UserProps> {
    create(user: UserProps): User {
        return new User(
            user._id,
            user.name,
            user.last_name,
            user.email,
            user.password_hash
        )
    }
}
