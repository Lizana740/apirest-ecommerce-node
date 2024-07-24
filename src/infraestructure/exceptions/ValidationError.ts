export class ValidationError extends Error {
    errors!: any[]
    constructor(error: any) {
        super("Validation error")
        super.message = "error during validation"
        super.name = "ValidationError"
        this.errors = error
    }
}
