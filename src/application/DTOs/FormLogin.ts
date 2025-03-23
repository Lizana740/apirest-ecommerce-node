import { IsEmail, IsNotEmpty, IsString} from "class-validator"

export class FormLogin {
    
    @IsNotEmpty({message:"El campo no puede estar vacío"})
    @IsString()
    password!:string

    @IsEmail({},{message:"No es un email valido"})
    @IsNotEmpty({message:"El campo no puede estar vacío"})
    email!:string
}