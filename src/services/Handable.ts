import { Repository } from "typeorm"
import { Handable } from "@/entity/Handable/"
import { AssignmentStudent } from "@/entity/Assignment"
import DataSource from "@/ormconfig"

class HandableService {
  private handableRepository: Repository<Handable>
  private assignmentStudentRepository: Repository<AssignmentStudent>

  constructor() {
    this.handableRepository = DataSource.getRepository(Handable)
    this.assignmentStudentRepository = DataSource.getRepository(AssignmentStudent)
  }

  async getHandableById(Id: string): Promise<Handable> {
    const handable = await this.handableRepository.findOne({ where: { Id } })
    if (!handable) {
      throw new Error("Handable not found")
    }
    return handable
  }

  async createHandable(assignmentStudent: AssignmentStudent): Promise<Handable> {

    const handable = this.handableRepository.create({
      AssignmentStudent: assignmentStudent
    })

    const createdHandable = await this.handableRepository.save(handable)
    return createdHandable
  }

  async getAssignmentStudentById(id: string): Promise<AssignmentStudent> {
    const assignmentStudent = await this.assignmentStudentRepository.findOne({ where: { Id: id } })
    if (!assignmentStudent) {
      throw new Error("AssignmentStudent not found")
    }
    return assignmentStudent
  }

  async updateHandable(handable: Handable, newHandable: Partial<Handable>):Promise<Handable>{
    const updatedHandable = this.handableRepository.merge(handable, newHandable)
    return await this.handableRepository.save(updatedHandable)
  }
}

export default HandableService
