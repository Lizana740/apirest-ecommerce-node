import { NameCollection } from "./config/const"
import container from "./config/container"
import { MongoDB } from "./config/mongo.db"

const mongo = container.get<MongoDB>(MongoDB)

const initialDb = async () => {
    await mongo.connect()
    await mongo.conection.dropCollection(NameCollection.product)
    await mongo.conection.dropCollection(NameCollection.user)
    await mongo.conection.dropCollection(NameCollection.category)
    await mongo.conection.dropCollection(NameCollection.review)

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

    await mongo.conection.createCollection(NameCollection.category, {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "description"],
                properties: {
                    name: {
                        bsonType: "string",
                    },
                    description: {
                        bsonType: "string",
                    },
                },
            },
        },
    })
    await mongo.conection
        .collection(NameCollection.category)
        .createIndex({ name: 1 }, { unique: true })

    await mongo.conection.createCollection(NameCollection.review, {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["product_id", "user_id", "coment", "point", "date"],
                properties: {
                    point: {
                        bsonType: "int",
                        maximum: 5,
                        minimum: 1,
                    },
                    coment: {
                        bsonType: "string",
                        minLength: 25,
                        maxLength: 1000,
                    },
                    product_id: {
                        bsonType: "objectId",
                    },
                    user_id: {
                        bsonType: "objectId",
                    },
                    data: {
                        bsonType: "date",
                    },
                },
            },
        },
    })
    await mongo.conection
        .collection(NameCollection.review)
        .createIndex({ product_id: 1, user_id: 1, date: 1 }, { unique: true })
    
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
