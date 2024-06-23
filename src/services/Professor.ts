import { Repository } from "typeorm"
import { User, Professor } from "@/entity/User"
import DataSource from "@/ormconfig"

class ProfessorService {
    private professorRepository: Repository<Professor>
    private userRepository: Repository<User>

    constructor() {
        this.professorRepository = DataSource.getRepository(Professor)
        this.userRepository = DataSource.getRepository(User)
    }

    async createProfessor(userId: string): Promise<Professor> {
        const user = await this.userRepository.findOne({ where: { Id: userId } })

        if (!user) {
            throw new Error("User not found")
        }

        const professor = this.professorRepository.create({ User: user })
        console.log(professor)
        await this.professorRepository.save(professor)
        return professor
    }
    async getProfessorByPersonId(personId: string): Promise<Professor | null> {
        return await this.professorRepository.findOne({ where: { User: { Id: personId } }, relations: ["User"] })
      }
}

export default ProfessorService
