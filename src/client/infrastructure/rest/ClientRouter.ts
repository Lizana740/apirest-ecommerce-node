import express from "express"
import { ClientController } from "./ClientController"
import { baseContainer } from "../../../shared/infrastructure/base.container"
import { JwtMiddleware } from "../../../shared/infrastructure/middleware/JwtMiddleware"

const routerClient = express.Router()
const controller = baseContainer.get(ClientController)

routerClient.post("/", controller.addClient.bind(controller))
routerClient.get("/all", JwtMiddleware.verify(), controller.getAllClient.bind(controller))
routerClient.delete("/:id", controller.deleteClientById.bind(controller))
routerClient.get("/:id", controller.getClientById.bind(controller))
routerClient.put("/:id", controller.updateClientById.bind(controller))

export default routerClient
