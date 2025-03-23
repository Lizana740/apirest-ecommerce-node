import { UserDto } from "./UserDto";
import {  IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class FormUserCreate extends UserDto{
    @IsString({message:"El campo debe ser una frase u oración"})
    @IsNotEmpty({message:"El campo no puede estar vacío"})
    @MinLength(8, {message:"No debe ser menor a 8 caracteres"})
    @MaxLength(16, {message:"No debe ser mayor a 16 caracteres"})
    password!:string
}