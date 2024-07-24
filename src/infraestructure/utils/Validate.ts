import { plainToInstance } from "class-transformer"
import { validateSync } from "class-validator"
import { ValidationError } from "../exceptions/ValidationError"

export class Validate {
    /**
     * @param type class with constrains
     * @returns {T} class
     * @throws {ValidationError} errors.
     */

    static validate<T>(type: any, object: any): T {
        const n = plainToInstance(type, object)
        const error = validateSync(n)
        if (Array.isArray(error) && error.length) {
            throw new ValidationError(error)
        }
        return object
    }
}
