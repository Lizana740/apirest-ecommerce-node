import { IsNotEmpty, IsString } from "class-validator"

export class CategoryDto {
    @IsString({message:"El campo debe ser una frase u oración"})
    @IsNotEmpty({message:"El campo no puede estar vacío"})
    name!: string

    @IsString({message:"El campo debe ser una frase u oración"})
    @IsNotEmpty({message:"El campo no puede estar vacío"})
    description!: string
}
