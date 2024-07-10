import { Repository } from "typeorm"
import DataSource from "@/ormconfig"
import { Assignment, AssignmentStudent } from "@/entity/Assignment"
import { Student } from "@/entity/User"
import { Classroom, ClassroomStudent } from "@/entity/Classroom"
import { CreateAssignmentDto } from "@/dto/Assignment"
import b2 from "@/config/b2Config"
import { TeamStep } from "@/entity/Project"

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
    const assignment = await this.assignmentRepository.findOne({ where:{Id} })
    if(!assignment)throw new Error("Assignment not founf")
    return assignment
  }
  async getAssignmentStudentById(Id:string):Promise<AssignmentStudent>{
    const assignmentStudent = await this.assignmentStudentRepository.findOne({ where:{Id}, relations:["Assignment", "Handables", "Handables"] })
    if(!assignmentStudent)throw new Error("AssignmentStudent not found")
    return assignmentStudent
  }

  async createAssignmentTeamStep(assignmentdto: CreateAssignmentDto, Classroom : Classroom, TeamStep: TeamStep): Promise<Assignment>{
    const assignment = this.assignmentRepository.create({
      ...assignmentdto,
      Classroom,
      TeamStep
    })
    return await this.assignmentRepository.save(assignment)
  }

  async  createAssignment(assignmentDto: CreateAssignmentDto, Classroom:{}): Promise<Assignment> {
    const { Instructions, DateToComplete, Title } = assignmentDto

    const parsedDate = new Date(DateToComplete)
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format")
    }

    const assignment = this.assignmentRepository.create({
      Instructions,
      DateToComplete: parsedDate,
      Title,
      Classroom,
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
      relations: ["Student"]
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
      relations: ["Assignment"]
    })

    return assignmentStudents.map(as => as.Assignment)
  }
  async getAssignmentStudentsByClassroom(classroomId: string): Promise<AssignmentStudent[]> {
    const assignmentStudents = await this.assignmentStudentRepository.find({
      where: {
        Assignment: {
          Classroom: { Id: classroomId }
        }
      },
      relations: ["Student", "Assignment", "Student.User"],
      select:{
        Student:{
          Id: true,
          User:{
            Id:true,
            Name:true,
            LastName1:true,
            LastName2:true,
            Email:true,
          }
        }
      }
    })
    return assignmentStudents
  }
  async getAssignmentStudentById2(Id: string): Promise<AssignmentStudent> {
    const assignmentStudent = await this.assignmentStudentRepository.findOne({ where: { Id }, relations: ["Handables", "Handables.Links"] })
    if (!assignmentStudent) throw new Error("AssignmentStudent not found")

    for (const handable of assignmentStudent.Handables) {
      for (const link of handable.Links) {
        if (link.LinkType === 'FILE') {
          try {
            const fileResponse = await this.fetchFileById(link.FileId)
            link.Link = fileResponse.data.toString('base64') // Store file data as base64 string
          } catch (error) {
            link.Link = "" // Handle error by setting FileData to null
            console.error(`Error fetching file ${link.Link}:`, error)
          }
        }
      }
    }

    return assignmentStudent
  }

  private async fetchFileById(fileId: string): Promise<any> {
    await b2.authorize()

    const response = await b2.downloadFileById({
      fileId,
      responseType: 'arraybuffer'
    })

    if (response.status !== 200) {
      throw new Error(`Failed to fetch file, status code: ${response.status}`)
    }

    return response
  }
}

export default AssignmentService
