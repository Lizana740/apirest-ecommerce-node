import express from "express";
import container from "./config/container";
import { MongoDB } from "./config/mongo.db";
import routerApi from "./core/router"
import { Logger } from "./src/infraestructure/logger/Logger";

const PORT = process.env.SERVER_PORT;

const dataBaseMongo = container.get<MongoDB>(MongoDB);

const main = async()=>{
  try{
    await dataBaseMongo.connect()
    console.log("[OK] --> Conection MongoDB")
    const app = express()
    const logger = new Logger()
    app.use(express.json())
    app.use(logger.register.bind(logger))
    app.use("/api", routerApi)
  
    app.listen(PORT, () => {
      console.log("[OK] --> Server running localhost:",PORT)
    })
  }catch(e:any){
    if(e instanceof RangeError){
      console.error(`[ERROR] --> PORT out of range`)
    }
    if(e?.code == 'ESERVFAIL'){
      console.error(`[ERROR] --> NO CONECTION MONDODB`)
    }
    if(e instanceof Error){
      console.error(`[ERROR] --> ${e.toString()}`)
      console.log(e.message)
    }
  }
}

main()

