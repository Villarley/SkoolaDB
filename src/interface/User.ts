import { AuthMethodEnum } from "../Enum"
export interface User {
    Id: string
    Name: string 
    LastName1: string
    LastName2: string
    Email: string
    Password: string
    AuthMethod: AuthMethodEnum
}
export interface UserInput {
    Name: string
    LastName1: string
    LastName2: string
    Email: string
    Password: string
  }