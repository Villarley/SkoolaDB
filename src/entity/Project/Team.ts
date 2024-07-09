import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import Project from "./Project"

@Entity()
class Team{
    @PrimaryGeneratedColumn("uuid")
    Id: string

    @Column({nullable:true})
    Name:string

    @ManyToOne(() => Project, project => project.Teams)
    Project: Project


}
export default Team