import { IsNotEmpty, IsString } from "class-validator"

export class ProductDto {
    @IsString({message:"El campo debe ser una frase u oración"})
    @IsNotEmpty({message:"El campo no puede estar vacío"})
    name!: string

    quantity!: number

    @IsString({message:"El campo debe ser una frase u oración"})
    @IsNotEmpty({message:"El campo no puede estar vacío"})
    description!: string
    
    @IsString({message:"El campo debe ser una frase u oración"})
    @IsNotEmpty({message:"El campo no puede estar vacío"})
    category!:string

    brand!:string

    price!:number
}
