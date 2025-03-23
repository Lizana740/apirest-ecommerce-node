import { ContainerModule, interfaces } from "inversify"

import { AuthController } from "./rest/AuthController"

const moduleAuth = new ContainerModule((bind: interfaces.Bind) => {
  bind<AuthController>(AuthController).to(AuthController)
})
export default moduleAuth
