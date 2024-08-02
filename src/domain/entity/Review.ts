import { ObjectId } from "mongodb"
import { Entity } from "../interface/Entity"

export class Review implements Entity {
    constructor(
        public _id: ObjectId | any,
        private point: number,
        private coment:string,
        private user_id: ObjectId,
        private product_id: ObjectId,
        private date:Date
    ) {}

    set setDate(p: Date) {
        this.date = p
    }
    get getDate() {
        return this.date
    }

    set setProduct(product: ObjectId) {
        this.product_id = this.product_id
    }
    get getProduct() {
        return this.product_id
    }

    set setUser(user: ObjectId) {
        this.user_id = this.user_id
    }
    get getUsert() {
        return this.user_id
    }
    set setComent(comment: string) {
        this.coment = this.coment
    }
    get getComent() {
        return this.coment
    }
    set setPoint(p: number) {
        this.point = p
    }
    get getPoint() {
        return this.point
    }
}
