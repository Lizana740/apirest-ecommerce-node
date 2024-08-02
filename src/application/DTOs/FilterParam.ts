import { IsArray, IsIn, IsNotEmpty, IsString } from "class-validator"

export class FilterParam {
  @IsString()
  property!: string
  
  @IsNotEmpty()
  value!:string|number
  
  @IsString()
  @IsIn(["$eq"])
  operator!: string
}

export class ArrayFilter {
  @IsArray()
  params!: FilterParam[]
}
