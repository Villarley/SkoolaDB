import { IsNotEmpty, Length } from "class-validator"

export class CreateAssignmentDto {
  @IsNotEmpty()
  @Length(1, 50)
  ClassroomId: string


  @IsNotEmpty()
  @Length(1, 500)
  Instructions: string

  @IsNotEmpty()
  @Length(1, 500)
  Title: string

  @IsNotEmpty()
  @Length(1, 20)
  DateToComplete: string

  TeamStepId:string

  PostedBy:string

}