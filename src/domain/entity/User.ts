import { ObjectId } from "mongodb"
import { Entity } from "../interface/Entity"

export class User implements Entity {
  constructor(
    public _id: ObjectId | any,
    private name: String,
    private lastName: String,
    private email: String
  ) {}

  set setName(name: string) {
    this.name = name
  }
  get getName() {
    return this.name
  }

  set setLastname(lastname: string) {
    this.lastName = lastname
  }
  get getLastname() {
    return this.lastName
  }

  set setEmail(email: string) {
    this.email = email
  }
  get getEmail() {
    return this.email
  }
}
