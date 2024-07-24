import { Entity } from "./Entity"

export interface IRepository<T extends Entity, P> {
    getById(id: P): Promise<T>
    getAll(): Promise<T[]>
    deleteById(id: P): Promise<void>
    updateById(p: P, ob: T): Promise<void>
    add(...args: any[]): Promise<P>
    filter(params: any[]): Promise<T[]>
}
