import { IsNotEmpty, Length } from "class-validator"

export class CreateClassroomDto {
  @IsNotEmpty()
  @Length(1, 50)
  Name: string

  @IsNotEmpty()
  @Length(1, 50)
  Section: string

}

export class JoinClassroomDto {
  @IsNotEmpty()
  @Length(1, 20)
  Code: string
}

export class UpdateClassroomDto {
  @IsNotEmpty()
  @Length(1, 50)
  Name: string

  @IsNotEmpty()
  @Length(1, 50)
  Section: string

  @IsNotEmpty()
  @Length(1, 20)
  Code: string
}
