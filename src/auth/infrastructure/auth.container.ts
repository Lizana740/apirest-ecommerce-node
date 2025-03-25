import { AuthController } from "./rest/AuthController"
import { baseContainer } from "../../shared/infrastructure/base.container"

baseContainer.bind<AuthController>(AuthController).to(AuthController)

