import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
class Assignment {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @Column()
  Instructions: string

  @Column()
  DateToComplete: Date
}

export default Assignment