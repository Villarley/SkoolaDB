import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Step, Team } from "@/entity/Project"

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
}

export default TeamStep