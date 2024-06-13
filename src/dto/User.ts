import { IsEmail, IsNotEmpty, Length } from 'class-validator'
import { UserInput } from "../interface/User"

export class UserInputDto implements UserInput {
  @IsNotEmpty()
  @Length(1, 50)
  Name: string

  @IsNotEmpty()
  @Length(1, 50)
  LastName1: string

  @IsNotEmpty()
  @Length(1, 50)
  LastName2: string

  @IsEmail()
  Email: string

  @IsNotEmpty()
  @Length(6, 100)
  Password: string
}
