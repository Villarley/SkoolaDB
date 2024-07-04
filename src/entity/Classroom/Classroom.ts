import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Assignment } from "@/entity/Assignment/"
import ClassroomProfessor from "./ClassroomProfessor"
import ClassroomStudent from "./ClassroomStudent"

@Entity()
class Classroom {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @Column()
  Name: string

  @Column()
  Section: string

  @Column()
  Code: string

  @OneToMany(() => Assignment, assignment => assignment.Classroom)
  Assignments: Assignment[]

  @OneToMany(() => ClassroomProfessor, classroomProfessor => classroomProfessor.Classroom)
  ClassroomProfessors: ClassroomProfessor[]

  @OneToMany(() => ClassroomStudent, classroomStudent => classroomStudent.Classroom)
  ClassroomStudents: ClassroomStudent[]
}
export default Classroom