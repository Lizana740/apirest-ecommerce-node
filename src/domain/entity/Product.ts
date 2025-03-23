import { ObjectId } from "mongodb"
import { Entity } from "../interface/Entity"

export class Product implements Entity {
    

    constructor(
        public _id: ObjectId | any,
        private name: string="",
        private description: string="",
        private price: number=0,
        private quantity: number=0,
        private path: string="",
        private category: ObjectId | any = null,
        private brand: ObjectId | any = null
    ) {}
    set setBrand(brand: ObjectId) {
        this.brand = brand
    }
    get getBrand() {
        return this.brand
    }

    set setCategory(category: ObjectId) {
        this.category = category
    }
    get getCategory() {
        return this.category
    }

    set setPath(path: string) {
        this.path = path
    }
    get getPath() {
        return this.path
    }

    set setPrice(price: number) {
        this.price = price
    }
    get getPrice() {
        return this.price
    }

    set setName(name: string) {
        this.name = name
    }
    get getName() {
        return this.name
    }

    set setQuantity(quantity: number) {
        this.quantity = quantity
    }
    get getQuantity() {
        return this.quantity
    }
    
    set setDescription(description: string) {
        this.description = description
    }
    get getDescription() {
        return this.description
    }
}
