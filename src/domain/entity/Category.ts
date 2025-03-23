import { ObjectId } from "mongodb";
import { Entity } from "../interface/Entity";

export class Category  implements Entity{
    constructor(
        public _id:ObjectId|any,
        private name:string,
        private description:string
    ){}

    set setDescription(description:string){
        this.description = description
    }
    get getDescription(){
        return this.description
    }

    set setName(name:string){
        this.name = name
    }
    get getName(){
        return this.name
    }

}