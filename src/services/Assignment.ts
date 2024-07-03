import { Repository } from "typeorm"
import DataSource from "@/ormconfig"
import { Assignment, AssignmentStudent } from "@/entity/Assignment"
import { Student } from "@/entity/User"
import { ClassroomStudent } from "@/entity/Classroom"
import { CreateAssignmentDto } from "@/dto/Assignment"

class AssignmentService {
  private assignmentRepository: Repository<Assignment>
  private assignmentStudentRepository: Repository<AssignmentStudent>
  private classroomStudentRepository: Repository<ClassroomStudent>

  constructor() {
    this.assignmentRepository = DataSource.getRepository(Assignment)
    this.assignmentStudentRepository = DataSource.getRepository(AssignmentStudent)
    this.classroomStudentRepository = DataSource.getRepository(ClassroomStudent)
  }

  async getAssignmentById(Id:string):Promise<Assignment>{
    const assignment = await this.assignmentRepository.findOne({where:{Id}})
    if(!assignment)throw new Error("Assignment not founf")
    return assignment
  }

  async createAssignment(assignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const { Instructions, DateToComplete } = assignmentDto

    const parsedDate = new Date(DateToComplete)
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format")
    }

    const assignment = this.assignmentRepository.create({
      Instructions,
      DateToComplete: parsedDate,
    })

    return await this.assignmentRepository.save(assignment)
  }

  async createAssignmentStudent(Assignment: Assignment, Student: Student): Promise<AssignmentStudent> {
    const assignmentStudent = this.assignmentStudentRepository.create({
      Assignment,
      Student,
    })

    return await this.assignmentStudentRepository.save(assignmentStudent)
  }

  async addStudentsToAssignment(classroomId: string, assignment: Assignment): Promise<AssignmentStudent[]> {
    const classroomStudents = await this.classroomStudentRepository.find({
      where: { Classroom: { Id: classroomId } },
      relations: ["student"]
    })

    if (classroomStudents.length === 0) {
      throw new Error("No students found in the specified classroom")
    }

    const assignmentStudents: AssignmentStudent[] = []
    for (const classroomStudent of classroomStudents) {
      const assignmentStudent = await this.createAssignmentStudent(assignment, classroomStudent.Student)
      assignmentStudents.push(assignmentStudent)
    }

    return assignmentStudents
  }

  async getAssignmentsByClassroomStudentId(classroomStudentId: string): Promise<Assignment[]> {
    const assignmentStudents = await this.assignmentStudentRepository.find({
      where: { Student: { Id: classroomStudentId } },
      relations: ["assignment"]
    })

    return assignmentStudents.map(as => as.Assignment)
  }
}

export default AssignmentService
