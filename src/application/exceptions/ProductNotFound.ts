export class ProductNotFound extends Error{
    constructor(){
        super("ProductNotFound")
        this.message="the product has not been found"
        this.name= "ProductNotFound"
    }
}