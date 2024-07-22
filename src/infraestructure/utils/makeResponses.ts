interface ResponseData  {
    data:any,
    message:string,
    date:Date,
}

interface ResponseError  {
    error:string
    message:string,
    date:Date
}

export function makeResponse(
    data:any|void, 
    message:string = "Succes operation!!"
):ResponseData{
    return {
        data:data,
        message:message,
        date: new Date(),
    }
}

export function makeErrorResponse(
    error:unknown,
    message:string = "Error operation!!"
):ResponseError{
    return {
        error:(error as Error).name,
        message:message,
        date: new Date(),
    }
}