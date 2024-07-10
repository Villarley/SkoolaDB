import { Router, Response } from "express"
import { validateJWT } from "@/middlewares"
import { IdRequest } from "@/interface/requests/constant"
import StepService from "@/services/Step"
import ProjectService from "@/services/Project"
import TeamService from "@/services/Team"
import { TeamStep } from "@/entity/Project"

const stepService = new StepService()
const projectService = new ProjectService()
const teamService = new TeamService()
const router = Router()

router.get("/:Id", validateJWT, async ( req:IdRequest, res:Response)=>{
    const { Id: stepId } = req.params
    try {
        const step = await stepService.getStepById(stepId)
        res.status(200).json(step)
    } catch (error:any) {
        res.status(500).json(error)
    }
})

router.post("/:Id", validateJWT, async ( req:IdRequest, res: Response)=>{
    const { Id: projectId } = req.params
    const step = req.body
    try {
        const project =  await projectService.getProjectById(projectId)
        const newStep = await stepService.createStep(step, project)

        const teams = await teamService.getTeamsByProjectId(projectId)


        let teamSteps: TeamStep[] = []
        for (const team of teams) {
            const teamStep = await stepService.createTeamStep(team, newStep)
            teamSteps.push(teamStep)
        }

        res.status(201).json(newStep)
    } catch (error:any) {
        res.status(500).json(error)
    }
})
export default router