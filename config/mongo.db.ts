import { injectable } from "inversify"
import { MongoClient, ServerApiVersion } from "mongodb"

@injectable()
export class MongoDB extends MongoClient {
    constructor(readonly uri:string) {
        super(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        })
    }
    async connected(): Promise<void> {
        await this.connect()
    }
    get conection() {
        return this.db("store")
    }
}
