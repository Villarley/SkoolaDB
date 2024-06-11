import { User } from "../models/User/User"
import DataSource from "../ormconfig"

class UserService {

    static async getUserById(Id: string) {
        return await DataSource.getRepository(User).findOneBy({
            Id: Id
        })
    }

    static async createUser(Body: User) {
        const user = DataSource.getRepository(User).create(Body)
        const results = await DataSource.getRepository(User).save(user)
        return results
    }
}
export default UserService