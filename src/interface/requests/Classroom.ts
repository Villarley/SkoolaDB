import { Request } from "express"
import { CreateClassroomDto, JoinClassroomDto } from "@/dto/Classroom"

export interface CreateClassroomRequest extends Request {
  params: {
    professorId: string
  }
  body: CreateClassroomDto
}

export interface JoinClassroomRequest extends Request {
  params: {
    classroomCode: string
    studentId: string
  }
  body: JoinClassroomDto
}

export interface GetClassroomsByStudentRequest extends Request {
  params: {
    studentId: string
  }
}

export interface GetClassroomsByProfessorRequest extends Request {
  params: {
    professorId: string
  }
}

export interface GetClassroomByIdRequest extends Request {
  params: {
    classroomId: string
  }
}
