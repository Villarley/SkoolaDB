import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Student } from "@/entity/User"
import Classroom from "./Classroom"

@Entity()
class ClassroomStudent {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @ManyToOne(() => Student, { cascade: true })
  @JoinColumn()
  Student: Student

  @ManyToOne(() => Classroom, { cascade: true })
  @JoinColumn()
  Classroom: Classroom
}
export default ClassroomStudent
