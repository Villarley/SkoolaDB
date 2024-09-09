import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne, Column } from "typeorm"
import { Team } from "@/entity/Project"
import { Student } from "@/entity/User"
import { Role } from "@/Enum"


@Entity()
class TeamMember{
    @PrimaryGeneratedColumn("uuid")
    Id: string

    @OneToOne(() => Student)   
    @JoinColumn()
    Student: Student

    @ManyToOne(() => Team, team => team.TeamMembers)
    Team: Team

    @Column({
        type: "enum",
        enum: Role,
        default: Role.MEMBER
    })
    Role : Role

}
export default TeamMember