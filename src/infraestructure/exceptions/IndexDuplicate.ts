export class IndexDuplicate extends Error {
    constructor(){
        super()
        this.name = "IndexDuplicate"
        this.message = "index is duplicate"
    }
}