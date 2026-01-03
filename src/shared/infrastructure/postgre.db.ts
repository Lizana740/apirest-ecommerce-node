import { injectable } from "inversify"
import { Pool } from "pg";

@injectable()
export class DB extends Pool {

    constructor(config:{
        user: string,
        host: string,
        database: string,
        password: string,
        port: number,
        max: number,
        idleTimeoutMillis: number,
        connectionTimeoutMillis: number,
    }) {
        super(config)
    }
}
