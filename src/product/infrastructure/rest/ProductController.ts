import { ProductAddUseCase } from "../../application/useCase/ProductAddUseCase"
import { Response, Request} from "express"
import { injectable } from "inversify"
import { ProductGetAll } from "../../application/useCase/ProductGetAll"
import { ProductDto } from "../../application/DTO/ProductDto"
import { ProductDeleteUseCase } from "../../application/useCase/ProductDeleteUseCase"

@injectable()
export class ProductController{
    constructor(
        private readonly productAddUC: ProductAddUseCase,
        private readonly productGetAll: ProductGetAll,
        private readonly productDeleteUC:ProductDeleteUseCase
    ){}

    async addProduct(req: Request, res:Response) {
        try{
            const productDto =  req.body as ProductDto 
            await this.productAddUC.execute(productDto)

        }catch(e ){
            console.error("Error")
            res.status(401).send("Error")
        }
    }

    async getAllProduct(req: Request, res:Response) {
        try{
            const response = await this.productGetAll.execute()
            res.send(response)
        }catch(e ){
            console.error("Error")
            res.status(401).send("Error")
        }
    }
    
    async deleteProductById(req:Request, res:Response){
        try{
            const { id } = req.params
            await this.productDeleteUC.execute(id)
            res.send(`delete: id => ${id}`)


        }catch(e:any){
            const json = {
                message: e.message
            }
            res.status(401).json(json)
        }
    }
}