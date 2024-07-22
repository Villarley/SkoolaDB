import { Repository } from "typeorm"
import DataSource from "@/ormconfig"
import { Classroom } from "@/entity/Classroom"
import { ClassroomProfessor } from "@/entity/Classroom/"
import { ClassroomStudent } from "@/entity/Classroom"
import { CreateClassroomDto } from "@/dto/Classroom"
import { generateUniqueClassCode } from "@/utils/generateCode"

class ClassroomService {
  private classroomRepository: Repository<Classroom>
  private classroomProfessorRepository: Repository<ClassroomProfessor>
  private classroomStudentRepository: Repository<ClassroomStudent>

  constructor() {
    this.classroomRepository = DataSource.getRepository(Classroom)
    this.classroomProfessorRepository = DataSource.getRepository(ClassroomProfessor)
    this.classroomStudentRepository = DataSource.getRepository(ClassroomStudent)
  }

  async createClassroom(createClassroomDto: CreateClassroomDto): Promise<Classroom> {
    console.log("hola")
    const Code = await generateUniqueClassCode()
    const classroom = this.buildClassroom(createClassroomDto, Code)
    await this.classroomRepository.save(classroom)
    return classroom
  }

  async assignProfessorToClassroom(professorId: string, classroom: Classroom): Promise<void> {
    const classroomProfessor = this.classroomProfessorRepository.create({
      Professor: { Id: professorId } as any,
      Classroom: classroom
    })
    await this.classroomProfessorRepository.save(classroomProfessor)
  }

  async joinClassroom(studentId: string, classroom: Classroom): Promise<ClassroomStudent> {
    const classroomStudent = this.classroomStudentRepository.create({
      Student: { Id: studentId } as any,
      Classroom: classroom
    })
    await this.classroomStudentRepository.save(classroomStudent)
    return classroomStudent
  }

  async getClassroomsByStudent(studentId: string): Promise<{ classroom: {Id:string, Code:string, Name:string, Section:string}, professor: { name: string, surname: string, email: string } }[]> {
    const classroomStudents = await this.classroomStudentRepository.find({
      where: { Student: { Id: studentId } },
      relations: ["Classroom", "Classroom.ClassroomProfessors", "Classroom.ClassroomProfessors.Professor", "Classroom.ClassroomProfessors.Professor.User"]
    })
    return classroomStudents.map(cs => ({
      classroom: {Id:cs.Classroom.Id, Code: cs.Classroom.Code, Name:cs.Classroom.Name, Section:cs.Classroom.Section},
      professor: {
        name: cs.Classroom.ClassroomProfessors[0]?.Professor?.User?.Name || 'No Professor Assigned',
        surname: cs.Classroom.ClassroomProfessors[0]?.Professor?.User?.LastName1 || 'No Professor Assigned',
        email: cs.Classroom.ClassroomProfessors[0]?.Professor?.User?.Email || 'No Professor Assigned'
      }
    }))
  }

  async getClassroomsByProfessor(professorId: string): Promise<Classroom[]> {
    const classroomProfessors = await this.classroomProfessorRepository.find({ where: { Professor: { Id: professorId } }, relations: ["Classroom"] })
    return classroomProfessors.map(cp => cp.Classroom)
  }

  async getClassroomById(classroomId: string): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOne({ where: { Id: classroomId } })
    if (!classroom) {
      throw new Error("Classroom not found")
    }
    return classroom
  }

  async getStudentsByClassroom(classroomId:string):Promise<ClassroomStudent[]>{
    const classroomStudents = await this.classroomStudentRepository.find({
      where: { Classroom: { Id: classroomId } },
      relations: ["Student"]
    })
    if (classroomStudents.length === 0)throw new Error("No students found in the specified classroom")
    return classroomStudents
  }

  private buildClassroom(createClassroomDto: CreateClassroomDto, Code: string): Classroom {
    const { Name, Section } = createClassroomDto
    return this.classroomRepository.create({
      Name,
      Section,
      Code
    })
  }
}

export default ClassroomService
