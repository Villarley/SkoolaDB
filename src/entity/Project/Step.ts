import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Project } from "@/entity/Project"
import TeamStep from "./TeamStep"
 
@Entity()
class Step{
    @PrimaryGeneratedColumn("uuid")
    Id: string

    @Column({nullable:true})
    Name:string

    @Column({nullable:true})
    Description:string

    @ManyToOne( () => Project, project => project.Steps )
    Project: Project

    @OneToMany(() => TeamStep, teamStep => teamStep.Step)
    TeamSteps: TeamStep[]
                                                          
}
export default Step                    