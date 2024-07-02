import { Assignment } from "@/entity/Assignment"
import { Repository } from "typeorm"
import DataSource from "@/ormconfig"
import { CreateAssignmentDto } from "@/dto/Assignment"
class AssignmentService {
  private assignmentRepository: Repository<Assignment>

  constructor(){
    this.assignmentRepository = DataSource.getRepository(Assignment)
  }

  async getAssignmentById(Id:string):Promise<Assignment>{
    const assignment = await this.assignmentRepository.findOne({where: { Id }})
    if (!assignment) {
        throw new Error("Assignment not found")
      }
    return assignment
  }


  async getAssignmentsByStudentId(Id:string):Promise<Assignment>{
    const assignment = await this.assignmentRepository.findOne({where: { Id }})
    if (!assignment) {
        throw new Error("Assignment not found")
      }
    return assignment
  }

  async createAssignment(assignment:CreateAssignmentDto):Promise<Assignment>{
    const parsedDate = new Date(assignment.DateToComplete)
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format")
    }
    assignment.DateToComplete = parsedDate
    const newAssignment = this.assignmentRepository.create(assignment)
    const savedAssignment = await this.assignmentRepository.save(newAssignment)
    console.log(savedAssignment)
    return savedAssignment
  }

}
export default AssignmentService