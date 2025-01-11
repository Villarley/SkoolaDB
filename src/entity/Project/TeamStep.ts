import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Step, Team } from "@/entity/Project"
import { Assignment } from "@/entity/Assignment"
import Post from "../Post/Post"
@Entity()
class TeamStep {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @ManyToOne(() => Team, { cascade: true })
  @JoinColumn()
  Team: Team

  @ManyToOne(() => Step, { cascade: true })
  @JoinColumn()
  Step: Step

  @OneToMany(()=> Assignment, assignment => assignment.TeamStep)
  Assignments: Assignment[]

  @OneToMany(() => Post, post => post.TeamStep )
  Posts: Post[]
}

export default TeamStep