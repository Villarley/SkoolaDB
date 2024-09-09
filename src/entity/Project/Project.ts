import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Classroom } from "@/entity/Classroom"
import { Team } from "@/entity/Project"
import { Step } from "@/entity/Project"
import Post from "../Post/Post"

@Entity()
class Project{
    @PrimaryGeneratedColumn("uuid")
    Id: string

    @Column({nullable:true})
    Name:string

    @Column({nullable:true})
    Description:string

    @ManyToOne(() => Classroom, Classroom => Classroom.Projects)
    Classroom: Classroom

    @OneToMany(() => Team, team => team.Project)
    Teams: Team[]

    @OneToMany(() => Step, step => step.Project)
    Steps: Step[]

    @OneToOne(() => Post, { nullable: true })
    @JoinColumn()
    Post: Post

}
export default Project