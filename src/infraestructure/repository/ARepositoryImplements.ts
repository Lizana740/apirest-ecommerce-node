import { injectable, unmanaged } from "inversify"
import { MongoDB } from "../../../config/mongo.db"
import { IRepository } from "../../domain/interface/IRepository"
import { Entity } from "../../domain/interface/Entity"
import { NameCollection } from "../../../config/const"
import { FilterParam } from "../../application/DTOs/FilterParam"
import { MongoServerError } from "mongodb"
import { IndexDuplicate } from "../exceptions/IndexDuplicate"

@injectable()
export abstract class ARepositoryImplements<E extends Entity, P>
    implements IRepository<E, P>
{
    constructor(
        @unmanaged() private readonly mongodb: MongoDB,
        @unmanaged() private readonly nameCollection: string
    ) {
        let a = true
        for (const key in NameCollection) {
            if (key == nameCollection) a = false
        }
        if (a) throw new Error("Not Found Name Collection")
    }

    abstract formatPrimary(id: P): any
    abstract mapperEntity(document: any): E

    private getCollection() {
        return this.mongodb.conection.collection(this.nameCollection)
    }

    async getAll(): Promise<E[]> {
        const collection = this.getCollection()
        const list = await collection.find().toArray()
        return list.map((item) => this.mapperEntity(item))
    }

    async deleteById(id: P): Promise<void> {
        const collection = this.getCollection()
        const product = await collection.deleteOne(this.formatPrimary(id))
        if (!product.deletedCount) {
            throw new Error("Error no se pudo eliminar ")
        }
    }

    async add(e: E): Promise<P> {
        try {
            if (e instanceof Object) {
                const collection = this.getCollection()
                const insert = await collection.insertOne(e)
                const p = insert.insertedId
                return p as any as P
            }
        } catch (e) {
            if (e instanceof MongoServerError) {
                throw new IndexDuplicate()
            }
        }
        throw new Error("")
    }

    async getById(id: P): Promise<E|null> {
        const p = await this.getCollection().findOne(this.formatPrimary(id))
        if(p){
            return this.mapperEntity(p)
        }
        return null
    }

    async updateById(id: P, ob: E): Promise<void> {
        const p = await this.getCollection().updateOne(this.formatPrimary(id), {
            $set: ob,
        })
        if (!p.modifiedCount) {
            throw new Error("No se pudo actualizar")
        }
    }

    async filter(params: FilterParam[]): Promise<E[]> {
        let abj: any = {}

        params.forEach(({ property, value, operator }) => {
            abj = {
                ...abj,
            }
            abj[property] = {}
            abj[property][operator] = value
        })
        const l = await this.getCollection().find(abj).toArray()
        return l.map((item) => this.mapperEntity(item))
    }
}
