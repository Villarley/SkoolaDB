import { Repository } from "typeorm"
import { User, Student } from "@/entity/User"
import DataSource from "@/ormconfig"

class StudentService {
    private studentRepository: Repository<Student>
    private userRepository: Repository<User>


    constructor() {
        this.studentRepository = DataSource.getRepository(Student)
        this.userRepository = DataSource.getRepository(User)
    }

    async createStudent(userId: string): Promise<Student> {
        const user = await this.userRepository.findOne({ where: { Id: userId } })

        if (!user) {
            throw new Error("User not found")
        }

        const student = this.studentRepository.create({ User: user })
        await this.studentRepository.save(student)
        return student
    }
    async getStudentByPersonId(personId: string): Promise<Student | null> {
        return await this.studentRepository.findOne({ where: { User: { Id: personId } }, relations: ["User"] })
      }
}

export default StudentService
