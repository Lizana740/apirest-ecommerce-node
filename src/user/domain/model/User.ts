import { ObjectId } from "mongodb"
import { Entity } from "../../../shared/domain/interface/Entity"

export class User implements Entity {
    constructor(
        public _id: ObjectId | any,
        private name: string = "",
        private lastname: string = "",
        private email: string = "",
        private password_hash: string = "",
        private address: string = ""
    ) {}
    set setAddress(address: string) {
        this.address = address
    }
    get getAddress() {
        return this.address
    }

    set setPasswordHash(password_hash: string) {
        this.password_hash = password_hash
    }

    get getPasswordHash() {
        return this.password_hash
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
}
