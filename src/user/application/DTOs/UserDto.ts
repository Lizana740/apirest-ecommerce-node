import { IsEmail, IsNotEmpty, IsString} from "class-validator"

export class UserDto {
    @IsNotEmpty({message:"El campo no puede estar vacío"})
    @IsString({message:"El campo debe ser una frase u oración"})
    name!: string

    @IsNotEmpty({message:"El campo no puede estar vacío"})
    @IsString({message:"El campo debe ser una frase u oración"})
    lastname!: string
    
    @IsNotEmpty({message:"El campo no puede estar vacío"})
    @IsEmail({},{message:"El campo deber ser valido"})
    email!: string

    @IsNotEmpty({message:"El campo no puede estar vacío"})
    @IsString({message:"El campo debe ser una frase u oración"})
    address!: string   
}
