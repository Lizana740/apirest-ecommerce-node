import { Response, Request} from "express"
import { injectable } from "inversify"
import { ProductGetAll } from "../../../application/useCase/product/ProductGetAll"
import { ProductDto } from "../../../application/DTOs/product/ProductDto"
import { ProductDeleteUseCase } from "../../../application/useCase/product/ProductDeleteUseCase"
import { ProductAddUseCase } from "../../../application/useCase/product/ProductAddUseCase"
import { ProductGetByIdUseCase } from "../../../application/useCase/product/ProductGetByIdUseCase"
import { ProductFilterUseCase } from "../../../application/useCase/product/ProductFilterUseCase"
import { ArrayFilter } from "../../../application/DTOs/FilterParam"

@injectable()
export class ProductController{
    constructor(
        private readonly productAddUC: ProductAddUseCase,
        private readonly productGetAll: ProductGetAll,
        private readonly productDeleteUC:ProductDeleteUseCase,
        private readonly productGetById:ProductGetByIdUseCase,
        private readonly productFilter:ProductFilterUseCase
    ){}

    async addProduct(req: Request, res:Response) {
        try{
            const productDto =  req.body as ProductDto 
            await this.productAddUC.execute(productDto)
            res.send("OK")
        }catch(e ){
            console.error("Error", e)
            res.status(401).send("Error")
        }
    }

    async getProductById(req: Request, res:Response){
        try{
            const { id } = req.params
            const p = await this.productGetById.execute(id) 
            res.json(p)
        }catch(e){
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

    async filterProduct(req:Request, res:Response){
        try {
            const array = req.body.params as ArrayFilter
            const lis = await this.productFilter.execute(array)
            
            res.send("fiter")

        } catch (e:any) {
            const json = {
                message: e.message
            }
            res.status(401).json(json)
        }
    }
}