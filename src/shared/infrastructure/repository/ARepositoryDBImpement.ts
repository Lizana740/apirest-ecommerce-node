import { Entity } from "../../domain/interface/Entity";
import { IRepository } from "../../domain/interface/IRepository";
import { injectable, unmanaged } from "inversify"
import { DB } from "../postgre.db";

@injectable()
export abstract class ARepositoryDBImpement<E , P> implements IRepository<E, P> {
    
    constructor(
        @unmanaged() private readonly connection:DB,
        @unmanaged() private readonly table: string,
        @unmanaged() private readonly properties: string[]
    ) {}
    abstract mapperEntity(document: any): E

    async getById(id: P): Promise<E | null> {
        try {
        const result = await this.connection.
            query(`SELECT ${this.properties.join(", ")} FROM ${this.table} WHERE id = $1`, [id])
        if (result.rows.length === 0) {
            return null
        }
        return this.mapperEntity(result.rows[0])
    } catch (error) {
        throw new Error("Error no se pudo obtener el registro")
    }
    }

    async getAll(): Promise<E[]> {
        try {
            const result = await this.connection.query(`SELECT ${this.properties.join(", ")} FROM ${this.table}`)
            return result.rows.map((row) => this.mapperEntity(row))
        } catch (error) {
            throw new Error("Error no se pudo obtener los registros")
        }
    }
    async deleteById(id: P): Promise<void> {
        try {
            await this.connection.query(`DELETE FROM ${this.table} WHERE id = $1`, [id])
        } catch (error) {
            throw new Error("Error no se pudo eliminar el registro")
        }
    }
    async updateById(p: P, ob: E): Promise<void> {
        try {
           /*  await this.connection.
                query(`UPDATE ${this.table} SET ${this.properties.map((prop) => `${prop} = $1`).join(", ")} WHERE id = $2`, [...this.properties.map((prop) => ob[prop]??""), p])
            return [] */
        } catch (error) {
            throw new Error("Error no se pudo actualizar el registro")
        }
    }
    async add(args: E): Promise<P> {
        try {
            const values = this.properties.map((prop,index) => {return args[prop as keyof E]?? ""})
            const result = await this.connection.query(`INSERT INTO ${this.table} (${this.properties.join(", ")}) VALUES (${this.properties.map((prop,index) => `$${index+1}`).join(", ")}) RETURNING *`, values)
            return result.rows[0]
        } catch (error) {
            throw new Error("Error no se pudo agregar el registro")
        }
    }
    async filter(params: any[]): Promise<E[]> {
        try {
            const result = await this.connection.query(`SELECT ${this.properties.join(", ")} FROM ${this.table} WHERE ${params.map((prop, index) => `${prop.property} ${this.operator(prop.operator)} $${index+1}`).join(" AND ")}`, 
            params.reduce((acc, prop) => {
                acc.push(prop.value)
                return acc
            }, [])
        )
            return result.rows.map((row) => this.mapperEntity(row))
        } catch (error) {
            throw new Error("Error no se pudo obtener el registro")
        }
    }

    private operator(operator: string){
        if(operator === "$eq"){
            return "="
        }
    }
}