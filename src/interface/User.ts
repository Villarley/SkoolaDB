import { AuthMethodEnum } from "../Enum"
class User {
    Id: string
    Name: string 
    LastName1: string
    LastName2: string
    Email: string
    Password: string
    AuthMethod: AuthMethodEnum
}
export default User