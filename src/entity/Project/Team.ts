import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import Project from "./Project"
import { TeamMember, TeamStep } from "@/entity/Project"

@Entity()
class Team{
    @PrimaryGeneratedColumn("uuid")
    Id: string

    @Column({nullable:true})
    Name:string

    @ManyToOne(() => Project, project => project.Teams)
    Project: Project

    @OneToMany(() => TeamMember, teamMember => teamMember.Team)
    TeamMembers: TeamMember[]

    @OneToMany(() => TeamStep, teamStep => teamStep.Team )
    TeamSteps: TeamStep[]

}
export default Team