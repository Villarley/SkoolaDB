import { User } from "../entity/User"
import { UserInput } from "../interface/User"
import  DataSource  from "../ormconfig"
import * as bcrypt from "bcrypt"
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
  async createUser(userInput: UserInput): Promise<User> {
      //hashing password
      const hashedPassword = await bcrypt.hash(userInput.Password, 10)
  
      const user = this.userRepository.create({
        ...userInput,
        Password: hashedPassword,
      })
  
      return await this.userRepository.save(user)
  }
}

export default UserService
