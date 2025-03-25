import "reflect-metadata"
import express from "express"
import { container } from "./shared/infrastructure/container"
import { MongoDB } from "./shared/infrastructure/mongo.db"
import routerApi from "../core/router"
import { Logger } from "./shared/infrastructure/logger/Logger"
import { EventBus } from "./shared/domain/interface/EventBus"
import { DomainEventSubscribers } from "./shared/domain/interface/DomainEventSubscribers"

const dataBaseMongo = container.get<MongoDB>(MongoDB)
const eventBus = container.get<EventBus>('EventBus')

const main = async (consol: boolean = false) => {
    try {
        eventBus.addSubscribers(DomainEventSubscribers.from(container))
        await dataBaseMongo.connect()
        if (consol) {
            console.log("[OK] --> Conection MongoDB")
        }
        const app = express()
        const logger = new Logger(consol)
        app.use(express.json())
        app.use(logger.register.bind(logger))
        app.use("/api", routerApi)

        app.get("/", (req: any, res: any) => {
            res.send("Application runing!!")
        })

        return app
    } catch (e: any) {
        if (e instanceof RangeError) {
            console.error(`[ERROR] --> PORT out of range`)
        }
        if (e?.code == "ESERVFAIL") {
            console.error(`[ERROR] --> NO CONECTION MONDODB`)
        }
        if (e instanceof Error) {
            console.error(`[ERROR] --> ${e.toString()}`)
            console.log(e.message)
        }
    }
}

export default main
