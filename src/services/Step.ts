import { Repository } from "typeorm"
import DataSource from "@/ormconfig"
import { Project, Step, Team, TeamStep } from "@/entity/Project"

class StepService {
    private stepRepository: Repository<Step>
    private teamStepRepository: Repository<TeamStep>

    constructor() {
        this.stepRepository = DataSource.getRepository(Step)
        this.teamStepRepository = DataSource.getRepository(TeamStep)
    }


    async getTeamStepById(Id:string):Promise<TeamStep>{
        const teamStep = await this.teamStepRepository.findOne({where:{Id}})
        if(!teamStep)throw new Error("TeamStep not found")
        return teamStep
    }

    async getStepById(Id:string):Promise<Step>{
        const step = await this.stepRepository.findOne({where:{Id}})
        if(!step)throw new Error("Step not found")
        return step
    }

    async createStep(step:Step, Project:Project):Promise<Step>{
        const newStep = this.stepRepository.create({
            ...step, 
            Project
        })
        await this.stepRepository.save(newStep)
        return newStep
    }

    async getTeamStepsByTeamId(Id:string):Promise<TeamStep[]>{
        const teamSteps = await this.teamStepRepository.find({where:{Team:{Id}}, relations:["Team", "Team.Project", "Step"]})
        if(!teamSteps)throw new Error("TeamSteps not found")
        return teamSteps
    }

    async createTeamStep(team:Team, step:Step):Promise<TeamStep>{
        const newTeamStep = this.teamStepRepository.create({Team: team, Step: step})
        await this.teamStepRepository.save(newTeamStep)
        return newTeamStep
    }

}
export default StepService