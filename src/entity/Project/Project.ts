import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Classroom } from "../Classroom"

@Entity()
class Project{
    @PrimaryGeneratedColumn("uuid")
    Id: string

    @Column({nullable:true})
    Name:string

    @Column({nullable:true})
    Description:string

    @ManyToOne(() => Classroom, classroom => classroom.Projects)
    Classroom: Classroom


}
export default Project