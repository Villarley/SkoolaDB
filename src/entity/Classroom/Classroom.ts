import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
export default Classroom