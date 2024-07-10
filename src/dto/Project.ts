import { IsNotEmpty, IsString } from "class-validator"

export class CreateProjectDto {

  @IsNotEmpty()
  @IsString()
  Name: string

  @IsNotEmpty()
  @IsString()
  Description: string
}
