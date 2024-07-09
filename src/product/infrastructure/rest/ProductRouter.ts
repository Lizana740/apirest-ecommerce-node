import express  from "express";
import { ProductController } from "./ProductController";
import container from "../../../../config/container"
const routerProduct = express.Router()

const controller = container.get(ProductController)

routerProduct.post('/', controller.addProduct.bind(controller))
routerProduct.get('/all', controller.getAllProduct.bind(controller))
routerProduct.delete('/:id', controller.deleteProductById.bind(controller))

export default routerProduct