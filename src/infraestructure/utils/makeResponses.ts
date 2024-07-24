import { ValidationError } from "../exceptions/ValidationError"

interface ResponseData {
    data: any
    message: string
    date: Date
}

interface ResponseError {
    error: string
    message: string
    date: Date
}

interface ResponseValidationError extends ResponseError {
    params: { field: string; message: string }[]
}

export function makeResponse(
    data: any | void,
    message: string = "Success operation!!"
): ResponseData {
    return {
        data: data,
        message: message,
        date: new Date(),
    }
}

export function makeErrorResponse(
    error: unknown,
    message: string = ""
): ResponseError | ResponseValidationError {
    let responseMessage = message
        ? message
        : (error as Error).message
        ? (error as Error).message
        : "Error not definet"

    let response = {
        error: (error as Error).name,
        message: responseMessage,
        date: new Date(),
    }

    if (error instanceof ValidationError) {
        const aux = error.errors.map((ev) => ({
            field: ev.property as string,
            message: ev.constraints,
        }))

        return {
            ...response,
            params: aux,
        }
    }

    return response
}
