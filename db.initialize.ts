import { NameCollection } from "./config/const"
import container from "./config/container"
import { MongoDB } from "./config/mongo.db"

const mongo = container.get<MongoDB>(MongoDB)

const initialDb = async () => {
    await mongo.connect()
    await mongo.conection.dropCollection(NameCollection.product)
    await mongo.conection.dropCollection(NameCollection.user)

    await mongo.conection.createCollection(NameCollection.product, {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "description", "price", "quantity", "path"],
                properties: {
                    name: {
                        bsonType: "string",
                    },
                    description: {
                        bsonType: "string",
                    },
                    price: {
                        bsonType: "number",
                        minimum: 1,
                    },
                    quantity: {
                        bsonType: "number",
                        minimum: 0,
                    },
                    path: {
                        bsonType: "string",
                    },
                },
            },
        },
    })

    await mongo.conection.createCollection(NameCollection.user, {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [
                    "name",
                    "lastname",
                    "email",
                    "password_hash",
                    "address",
                ],
                properties: {
                    name: {
                        bsonType: "string",
                    },
                    lastname: {
                        bsonType: "string",
                    },
                    email: {
                        bsonType: "string",
                        pattern: "^.+@.+..+$",
                    },
                    password_hash: {
                        bsonType: "string",
                    },
                    address: {
                        bsonType: "string",
                    },
                },
            },
        },
    })
    await mongo.conection
        .collection(NameCollection.user)
        .createIndex({ email: 1 }, { unique: true })
}

initialDb()
    .then(() => {
        console.log("base de datos creada")
    })
    .catch((e) => {
        console.log("Error", e)
    })
    .finally(() => {
        return
    })
