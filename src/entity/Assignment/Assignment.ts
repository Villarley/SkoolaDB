import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from "typeorm"
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
  
  @ManyToOne(() => Classroom, { cascade : true })
  @JoinColumn()
  Classroom: Classroom
  @ManyToMany(() => AssignmentStudent, assignmentStudent => assignmentStudent.Assignment)
  students: AssignmentStudent[];
}

export default Assignment