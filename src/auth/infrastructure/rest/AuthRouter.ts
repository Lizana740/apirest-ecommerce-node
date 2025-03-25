import express from "express"
import { baseContainer } from "../../../shared/infrastructure/base.container"
import { AuthController } from "./AuthController"

const routerAuth = express.Router()

const controller = baseContainer.get(AuthController)

routerAuth.post("/", controller.login.bind(controller))

export default routerAuth
