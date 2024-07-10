import { Request } from "express"

export interface createTeamMemberRequest extends Request {
  params: {
    teamId: string,
    studentId: string
  }
}