import { IAggregateRoot } from "../../../shared/domain/interface/IAggregateRoot"

class Client {
    constructor(
        public _id: number|null,
        private name: string = "",
        private lastname: string = "",
        private email: string = "",
        private address: string = "",
        private password_hash: string = ""
    ) {}

    set setAddress(address: string) {
        this.address = address
    }
    get getAddress() {
        return this.address
    }

    set setName(name: string) {
        this.name = name
    }
    get getName() {
        return this.name
    }

    set setLastname(lastname: string) {
        this.lastname = lastname
    }
    get getLastname() {
        return this.lastname
    }

    set setEmail(email: string) {
        this.email = email
    }
    get getEmail() {
        return this.email
    }

    set setPasswordHash(password_hash: string) {
        this.password_hash = password_hash
    }
    get getPasswordHash() {
        return this.password_hash
    }
}

export type ClientProps = {
    _id: number|null,
    name: string,
    last_name: string,
    email: string,
    address: string,
    password_hash: string
}

export class AggregateClient implements IAggregateRoot<Client, ClientProps> {
    create(client: ClientProps): Client {
        return new Client(
            client._id,
            client.name,
            client.last_name,
            client.email,
            client.address,
            client.password_hash
        )
    }
}
