import { baseContainer } from "./base.container"
import { EventBus } from "../domain/interface/EventBus"
import { InMemoryAsyncEventBus } from "./repository/InMemoryAsyncEventBus"

import "../../client/infrastructure/client.container"
import "../../auth/infrastructure/auth.container"
/* import "../../product/infrastructure/product.container" */
/* import "../../category/infrastructure/category.container" */
/* import "../../review/infrastructure/review.container" */
import { DB } from "./postgre.db"


//baseContainer.bind<MongoDB>(MongoDB).toConstantValue(new MongoDB(process.env.MONGODB ?? "error"))
baseContainer.bind(DB).toConstantValue(new DB({
    user: process.env.DB_USER ?? "error",
    host: process.env.DB_HOST ?? "error",
    database: process.env.DB_DATABASE ?? "error",
    password: process.env.DB_PASSWORD ?? "error",
    port: Number(process.env.DB_PORT ?? "error"),
    max: Number(process.env.DB_MAX ?? "error"),
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT ?? "error"),
    connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT ?? "error"),
}))

baseContainer.bind(InMemoryAsyncEventBus).toSelf().inSingletonScope()
baseContainer.bind<EventBus>("EventBus").toService(InMemoryAsyncEventBus)

export { baseContainer as container }
