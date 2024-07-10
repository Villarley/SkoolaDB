import { Repository } from "typeorm"
import { Team, TeamMember } from "@/entity/Project"
import DataSource from "@/ormconfig"

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

    async getTeamsByStudentId(studentId:string):Promise<Team[]>{
        const team = await this.teamMemberRepository.find({where:{Student:{Id:studentId}}})
        if(!team)throw new Error("Team not found")
        return team
    
    }

    async createTeam(team:{}):Promise<Team>{
        const newTeam = this.teamRepository.create(team)
        await this.teamRepository.save(newTeam)
        return newTeam
    }
}
export default TeamService