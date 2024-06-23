import { Repository } from "typeorm"
import * as bcrypt from "bcrypt"
import { User } from "@/entity/User"
import { UserInput } from "@/interface/User"
import  DataSource  from "@/ormconfig"
import { generateToken } from "@/utils/jwt"


class UserService {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = DataSource.getRepository(User)
  }

  async generateToken(user:User):Promise<string>{
    const payload = { Id: user.Id, Email: user.Email }
    return generateToken(payload)
  }

  async getAllUsers(): Promise<User[] | []> {
    const users = await this.userRepository.find()
    return users
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compareSync(password, user.Password)
  }

  async getUserById(Id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ Id })
  }

  async getUserByName(name: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ Name: name })
  }

  async getUserByEmail(Email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ Email })
    if (!user) {
      throw new Error("User not found")
    }
    return user
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
      userInput.Password = hashedPassword
      const user = this.userRepository.create(userInput)
      this.userRepository.save(user)
      return user
  }
  async login(email: string, password: string): Promise<{ user: User, token: string }> {
    const user = await this.getUserByEmail(email)

    if (!user || !(await this.validatePassword(user, password))) {
      throw new Error("Invalid email or password")
    }
    const token = await this.generateToken(user)
    return { user, token }
  }
  async loginWithGoogle(Email: string): Promise<{user:User, token: string}> {
    const user = await this.getUserByEmail(Email)
    if(!user) throw new Error("User not found")
    const token = await this.generateToken(user)
    return {user, token}
  }
}

export default UserService
