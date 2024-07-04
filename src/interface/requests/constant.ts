import { Request } from "express"

export interface IdRequest extends Request {
  params: {
    Id: string
  }
}