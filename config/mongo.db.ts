import { injectable } from "inversify";
import { MongoClient, ServerApiVersion, Db } from "mongodb";

@injectable()
export class MongoDB {
  private uri = process.env.MONGODB ?? "error";
  private readonly client: MongoClient;
  public db!: Db;
  constructor() {
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
  async connect(): Promise<void> {
    await this.client.connect();
    this.db = this.client.db("store");
  }
  async getCollection<T>(name: string): Promise<T> {
    return this.db.collection(name) as unknown as T;
  }
}
