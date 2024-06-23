import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Professor } from "@/entity/User"
import { Classroom } from "./Classroom"

@Entity()
export class ClassroomProfessor {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @ManyToOne(() => Professor, { cascade: true })
  @JoinColumn()
  ProfessorId: Professor

  @ManyToOne(() => Classroom, { cascade: true })
  @JoinColumn()
  ClassroomId: Classroom
}
