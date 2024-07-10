import { Repository } from "typeorm"
import { Project, Team, TeamMember } from "@/entity/Project"
import DataSource from "@/ormconfig"
import { Role } from "@/Enum"
import { Student } from "@/entity/User"

class TeamService {
    private teamRepository: Repository<Team>
    private teamMemberRepository: Repository<TeamMember>

    constructor() {
        this.teamRepository = DataSource.getRepository(Team)
        this.teamMemberRepository = DataSource.getRepository(TeamMember)
    }

    async getTeamById(Id:string):Promise<Team>{
        const team = await this.teamRepository.findOne({where:{Id}})
        if(!team)throw new Error("Team not found")
        return team
    }

    async getTeamsByProjectId(projectId:string):Promise<Team[]>{
        const team = await this.teamRepository.find({where:{Project:{Id: projectId}}, relations:["Project"]})
        if(!team)throw new Error("Team not found")
        return team
    }

    async createTeamMember(team:Team, student:Student, role: Role):Promise<TeamMember>{
        const newTeamMember = this.teamMemberRepository.create({
            Team:team,
            Student:student,
            Role: role
        })
        await this.teamMemberRepository.save(newTeamMember)
        return newTeamMember
    }

    async getTeamsByStudentId(studentId:string):Promise<TeamMember[]>{
        const team = await this.teamMemberRepository.find({where:{Student:{Id:studentId}}, relations:["Team"]})
        if(!team)throw new Error("Team not found")
        return team
    
    }

    async createTeam(team:{}, project:Project):Promise<Team>{
        const newTeam = this.teamRepository.create({
            ...team,
            Project: project
        })
        await this.teamRepository.save(newTeam)
        return newTeam
    }

    async updateTeam(existingTeam: Team, newTeamData: Partial<Team>): Promise<Team> {
        // Merge the new data with the existing data
        const updatedTeam = this.teamRepository.merge(existingTeam, newTeamData);
        return this.teamRepository.save(updatedTeam);
      }
}
export default TeamService