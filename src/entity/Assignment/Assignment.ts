import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Classroom } from "@/entity/Classroom/"

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

}

export default Assignment