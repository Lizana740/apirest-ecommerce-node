import express from "express"
import { UserController } from "./UserController"
import container from "../../../../config/container"
const routerUser = express.Router()

const controller = container.get(UserController)

routerUser.post("/", controller.addUser.bind(controller))
routerUser.get("/all", controller.getAllUser.bind(controller))
routerUser.delete("/:id", controller.deleteUserById.bind(controller))
routerUser.get("/:id", controller.getUserById.bind(controller))
routerUser.put("/:id", controller.updateUserById.bind(controller))

export default routerUser
