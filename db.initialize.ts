import { BSONType } from "mongodb"
import container from "./config/container"
import { MongoDB } from "./config/mongo.db"
const mongo = container.get<MongoDB>(MongoDB)

const initialDb = async()=>{
    await mongo.connect()
    await mongo.db.createCollection("product",{
        validator:{
            $jsonSchema:{
                bsonType:"object",
                title: "Validation of produc",
                properties: {
                   category: {
                      enum: [ "Alimento", "Ropa", "Herramienta" ]
                   },
                   name
                }

            },
        }
    })
}

await initialDb()
