import { Repository } from "typeorm"
import * as bcrypt from "bcrypt"
import { User } from "@/entity/User"
import { UserInput } from "@/interface/User"
import  DataSource  from "@/ormconfig"
import { generateToken } from "@/utils/jwt"
import StudentService from "@/services/Student"
import ProfessorService from "@/services/Professor"


class UserService {
  private userRepository: Repository<User>
  private studentService: StudentService
  private professorService: ProfessorService

  constructor() {
    this.userRepository = DataSource.getRepository(User)
    this.studentService = new StudentService()
    this.professorService = new ProfessorService()
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
      const savedUser = this.userRepository.save(user)
      return savedUser
  }
  async login(email: string, password: string): Promise<{ user: User, token: string, roleId: string }> {
    const user = await this.getUserByEmail(email)

    if (!user || !(await this.validatePassword(user, password))) {
      throw new Error("Invalid email or password")
    }
    const token = await this.generateToken(user)

    // Fetch role ID (student or professor)
    const student = await this.studentService.getStudentByPersonId(user.Id)
    const professor = await this.professorService.getProfessorByPersonId(user.Id)
    const roleId = student ? student.Id : professor ? professor.Id : "null"
    console.log(roleId)
    return { user, token, roleId }
  }

  async loginWithGoogle(Email: string): Promise<{ user: User, token: string, roleId: string }> {
    const user = await this.getUserByEmail(Email)
    if (!user) throw new Error("User not found")
    const token = await this.generateToken(user)

    // Fetch role ID (student or professor)
    const student = await this.studentService.getStudentByPersonId(user.Id)
    const professor = await this.professorService.getProfessorByPersonId(user.Id)
    const roleId = student ? student.Id : professor ? professor.Id : "null"

    return { user, token, roleId }
  }
}

export default UserService
