import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Classroom } from "@/entity/Classroom/"
import AssignmentStudent from "./AssignmentStudent"
import { TeamStep } from "../Project"

@Entity()
class Assignment {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @Column({nullable:true})
  Title: string

  @Column()
  Instructions: string

  @Column()
  DateToComplete: Date
  
  @ManyToOne(() => Classroom, classroom => classroom.Assignments)
  Classroom: Classroom

  @ManyToOne(() => TeamStep, teamStep => teamStep.Assignments)
  TeamStep: TeamStep

  @OneToMany(() => AssignmentStudent, assignmentStudent => assignmentStudent.Assignment)
  AssignmentStudents: AssignmentStudent[]
}

export default Assignment