import { injectable } from "inversify";
import { MongoClient, ServerApiVersion, Db } from "mongodb";

@injectable()
export class MongoDB extends MongoClient{
  constructor() {
    const uri = process.env.MONGODB ?? "error";
    super(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
  async connected(): Promise<void> {
    await this.connect();
  }
  get conection(){
    return this.db("store")
  }
}
