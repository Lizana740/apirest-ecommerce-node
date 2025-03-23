import express from "express"
import { CategoryController } from "./CategoryController"
import container from "../../../../config/container"
const routerCategory = express.Router()

const controller = container.get(CategoryController)

routerCategory.post("/", controller.addCategory.bind(controller))
routerCategory.get("/all", controller.getAllCategory.bind(controller))
routerCategory.delete("/:id", controller.deleteCategoryById.bind(controller))
routerCategory.get("/:id", controller.getCategoryById.bind(controller))
routerCategory.put("/:id", controller.updateCategoryById.bind(controller))

export default routerCategory
