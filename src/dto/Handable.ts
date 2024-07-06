import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateHandableDto {
  @IsUUID()
  @IsNotEmpty()
  AssignmentStudentId: string
}
