import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Classroom } from "@/entity/Classroom/"
import AssignmentStudent from "./AssignmentStudent"

@Entity()
class Assignment {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @Column()
  Instructions: string

  @Column()
  DateToComplete: Date
  
  @ManyToOne(() => Classroom, classroom => classroom.Assignments)
  Classroom: Classroom

  @OneToMany(() => AssignmentStudent, assignmentStudent => assignmentStudent.Assignment)
  AssignmentStudents: AssignmentStudent[]
}

export default Assignment