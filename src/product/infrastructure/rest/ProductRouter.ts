import express from "express"
import { ProductController } from "./ProductController"
import { baseContainer } from "../../../shared/infrastructure/base.container"
const routerProduct = express.Router()

const controller = baseContainer.get(ProductController)


routerProduct.post("/",controller.addProduct.bind(controller))
routerProduct.get("/all", controller.getAllProduct.bind(controller))
routerProduct.delete("/:id", controller.deleteProductById.bind(controller))
routerProduct.get("/:id", controller.getProductById.bind(controller))
routerProduct.post("/filter", controller.filterProduct.bind(controller))

export default routerProduct
