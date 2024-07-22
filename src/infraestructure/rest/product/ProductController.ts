import { Response, Request } from "express"
import { injectable } from "inversify"
import { ProductGetAll } from "../../../application/useCase/product/ProductGetAll"
import { ProductDto } from "../../../domain/DTOs/product/ProductDto"
import { ProductDeleteUseCase } from "../../../application/useCase/product/ProductDeleteUseCase"
import { ProductAddUseCase } from "../../../application/useCase/product/ProductAddUseCase"
import { ProductGetByIdUseCase } from "../../../application/useCase/product/ProductGetByIdUseCase"
import { ProductFilterUseCase } from "../../../application/useCase/product/ProductFilterUseCase"
import { ArrayFilter } from "../../../domain/DTOs/FilterParam"
import { makeErrorResponse, makeResponse } from "../../utils/makeResponses"

@injectable()
export class ProductController {
  constructor(
    private readonly productAddUC: ProductAddUseCase,
    private readonly productGetAll: ProductGetAll,
    private readonly productDeleteUC: ProductDeleteUseCase,
    private readonly productGetById: ProductGetByIdUseCase,
    private readonly productFilter: ProductFilterUseCase
  ) {}

  async addProduct(req: Request, res: Response) {
    try {
      const productDto = req.body as ProductDto
      const p = await this.productAddUC.execute(productDto)

      res.status(201).json(makeResponse({id:p}))
    } catch (e) {
      res.status(401).json(makeErrorResponse(e))
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const p = await this.productGetById.execute(id)
      res.json(makeResponse(p, "Producto obtenido con éxito!!"))
    } catch (e) {
      res
        .status(401)
        .json(makeErrorResponse(e, "No se pudo encontrar el producto"))
    }
  }

  async getAllProduct(req: Request, res: Response) {
    try {
      const response = await this.productGetAll.execute()
      res.json(makeResponse(response))
    } catch (e) {
      res.status(401).json(makeErrorResponse(e))
    }
  }

  async deleteProductById(req: Request, res: Response) {
    try {
      const { id } = req.params
      await this.productDeleteUC.execute(id)
      res.send(makeResponse([], "Producto eliminado con éxito"))
    } catch (e: any) {
      res.status(401).json(makeErrorResponse(e))
    }
  }

  async filterProduct(req: Request, res: Response) {
    try {
      const array = req.body.params as ArrayFilter
      const lis = await this.productFilter.execute(array)

      res.send(makeResponse(lis))
    } catch (e: any) {
      res.status(401).json(makeErrorResponse(e))
    }
  }
}
