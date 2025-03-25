import { baseContainer } from "./base.container"
import { EventBus } from "../domain/interface/EventBus"
import { InMemoryAsyncEventBus } from "./repository/InMemoryAsyncEventBus"
import { MongoDB } from "./mongo.db"

import "../../user/infrastructure/user.container"
import "../../auth/infrastructure/auth.container"
import "../../product/infrastructure/product.container"
import "../../category/infrastructure/category.container"
import "../../review/infrastructure/review.container"


baseContainer.bind<MongoDB>(MongoDB).toConstantValue(new MongoDB(process.env.MONGODB ?? "error"))
baseContainer.bind(InMemoryAsyncEventBus).toSelf().inSingletonScope()
baseContainer.bind<EventBus>("EventBus").toService(InMemoryAsyncEventBus)

export { baseContainer as container }
