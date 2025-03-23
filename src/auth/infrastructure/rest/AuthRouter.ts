import express from "express"
import { AuthController } from "./AuthController"
import container from "../../../../config/container"
const routerAuth = express.Router()

const controller = container.get(AuthController)

routerAuth.post("/", controller.login.bind(controller))

export default routerAuth
