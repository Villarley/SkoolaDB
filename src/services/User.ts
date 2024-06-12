import { User } from "../entity/User"
import { User as UserInterface } from "../interface/"
import  DataSource  from "../ormconfig"
import { Repository } from "typeorm"

class UserService {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = DataSource.getRepository(User)
  }

  async getAllUsers(): Promise<User[] | []> {
    const users = await this.userRepository.find()
    return users
  }

  async getUserById(Id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ Id })
  }

  async getUserByName(name: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ Name: name })
  }

  async getUsersByEmail(Email: string): Promise<User[]> {
    return await this.userRepository.findBy({ Email })
  }

  async getUsersByFirstName(Name: string): Promise<User[]> {
    return await this.userRepository.findBy({ Name })
  }

  async getAllUsersWithCount(): Promise<[User[], number]> {
    return await this.userRepository.findAndCount()
  }
  async createUser(User: UserInterface): Promise<User> {
        return await this.userRepository.save(User)
  }
}

export default UserService
