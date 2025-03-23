import { ContainerModule, interfaces } from "inversify"
import { IUserRepository } from "../domain/repository/IUserRepository"
import { UserRepositoryImplement } from "./repository/UserRepositoryImplement"
import { UserAddUseCase } from "../application/useCases/UserAddUseCase"
import { UserGetAll } from "../application/useCases/UserGetAll"
import { UserGetByIdUseCase } from "../application/useCases/UserGetByIdUseCase"
import { UserDeleteUseCase } from "../application/useCases/UserDeleteUseCase"
import { UserFilterUseCase } from "../application/useCases/UserFilterUseCase"
import { UserUpdateUseCase } from "../application/useCases/UserUpdateUseCase"
import { UserController } from "./rest/UserController"

const moduleUser = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>("IUserRepository").to(UserRepositoryImplement)

  //->>[USER]<<-/User/
  bind<UserAddUseCase>(UserAddUseCase).to(UserAddUseCase)
  bind<UserGetAll>(UserGetAll).to(UserGetAll)
  bind<UserGetByIdUseCase>(UserGetByIdUseCase).to(UserGetByIdUseCase)
  bind<UserDeleteUseCase>(UserDeleteUseCase).to(UserDeleteUseCase)
  bind<UserFilterUseCase>(UserFilterUseCase).to(UserFilterUseCase)
  bind<UserUpdateUseCase>(UserUpdateUseCase).to(UserUpdateUseCase)

  bind<UserController>(UserController).to(UserController)
})
export default moduleUser
