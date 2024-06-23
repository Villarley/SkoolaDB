import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Student } from "@/entity/User"
import { Classroom } from "./Classroom"

@Entity()
export class ClassroomStudent {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @ManyToOne(() => Student, { cascade: true })
  @JoinColumn()
  StudentId: Student

  @ManyToOne(() => Classroom, { cascade: true })
  @JoinColumn()
  ClassroomId: Classroom
}
