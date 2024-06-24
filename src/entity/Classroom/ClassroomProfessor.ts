import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Professor } from "@/entity/User"
import Classroom from "./Classroom"

@Entity()
class ClassroomProfessor {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @ManyToOne(() => Professor, { cascade: true })
  @JoinColumn()
  Professor: Professor

  @ManyToOne(() => Classroom, { cascade: true })
  @JoinColumn()
  Classroom: Classroom
}

export default ClassroomProfessor

