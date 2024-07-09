import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Classroom } from "@/entity/Classroom"
import Team from "./Team"

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

    @OneToMany(() => Team, team => team.Project)
    Teams: Team[]

}
export default Project