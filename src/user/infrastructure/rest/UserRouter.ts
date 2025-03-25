import express from "express"
import { UserController } from "./UserController"
import { baseContainer } from "../../../shared/infrastructure/base.container"
import { JwtMiddleware } from "../../../shared/infrastructure/middleware/JwtMiddleware"

const routerUser = express.Router()
const controller = baseContainer.get(UserController)

routerUser.post("/", controller.addUser.bind(controller))
routerUser.get("/all",JwtMiddleware.verify([]), controller.getAllUser.bind(controller))
routerUser.delete("/:id", controller.deleteUserById.bind(controller))
routerUser.get("/:id", controller.getUserById.bind(controller))
routerUser.put("/:id", controller.updateUserById.bind(controller))

export default routerUser
