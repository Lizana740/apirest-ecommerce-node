import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
} from "class-validator"

export class ReviewDto {
    @IsNotEmpty({ message: "El campo no puede estar vacío" })
    @IsNumber({}, { message: "El campo debe ser un número" })
    @Max(5)
    @Min(1)
    point!: number

    @IsNotEmpty({ message: "El campo no puede estar vacío" })
    @IsString({ message: "El campo debe ser una frase u oración" })
    @MinLength(25)
    @MaxLength(1000)
    coment!: string

    @IsMongoId({ message: "No es un identificador valido" })
    user_id!: string

    @IsMongoId({ message: "No es un identificador valido" })
    product_id!: string

    constructor(
        point: number,
        coment: string,
        user_id: string,
        product_id: string
    ) {
        this.point = point
        this.coment = coment
        this.user_id = user_id
        this.product_id = product_id
    }
}
