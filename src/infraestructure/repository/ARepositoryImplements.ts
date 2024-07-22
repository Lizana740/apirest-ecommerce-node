import { injectable, unmanaged } from "inversify"
import { MongoDB } from "../../../config/mongo.db"
import { IRepository } from "../../domain/interface/IRepository"
import { Entity } from "../../domain/interface/Entity"
import { NameCollection } from "../../../config/const"

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

    private getCollection() {
        return this.mongodb.conection.collection(this.nameCollection)
    }

    async getAll(): Promise<E[]> {
        const collection = this.getCollection()
        const list = await collection.find().toArray()
        return list as any as E[]
    }

    async deleteById(id: P): Promise<void> {
        const collection = this.getCollection()
        const product = await collection.deleteOne(this.formatPrimary(id))
        if (!product.deletedCount) {
            throw new Error("Error no se pudo eliminar ")
        }
    }

    async add(e: E): Promise<P> {
        if (e instanceof Object) {
            const collection = this.getCollection()
            const insert = await collection.insertOne(e)
            const p = insert.insertedId
            return p as any as P
        }else{
          throw new Error("No se puede ingresar")
        }
    }

    async getById(id: P): Promise<E> {
        const p = await this.getCollection().findOne(this.formatPrimary(id))
        return p as any as E
    }

    async updateById(id: P, ob: E): Promise<void> {
        const p = await this.getCollection().updateOne(this.formatPrimary(id), {
            $set: ob,
        })
        if (!p.modifiedCount) {
            throw new Error("No se pudo actualizar")
        }
    }

    async filter(params: any[]): Promise<E[]> {
        const abj = { ...params }
        const l = await this.getCollection().find(params).toArray()
        return l as any as E[]
    }

    /*     setNameCollection(name:Collection){
        this.nameCollection = name
    } */
}
