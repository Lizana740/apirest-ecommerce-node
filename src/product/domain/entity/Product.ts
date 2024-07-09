import { ObjectId } from "mongodb"

export class Product {
    constructor(
        public _id:ObjectId|any,
        private name:string,
        private quantity:number,
        private description:string
    ){}

    set setName(name:string){
        this.name = name
    }
    get getName(){
        return this.name
    }
    set setQuantity(quantity:number){
        this.quantity = quantity
    }
    get getQuantity(){
        return this.quantity
    }
    set setDescription(description:string){
        this.description = description
    }
    get getDescription(){
        return this.description
    }
}