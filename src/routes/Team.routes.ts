import { Router, Response } from "express"
import ProjectService from "@/services/Project"
import TeamService from "@/services/Team"
import StudentService from "@/services/Student"
import { validateJWT } from "@/middlewares/"
import { IdRequest } from "@/interface/requests/constant"
import { createTeamMemberRequest } from "@/interface/requests/Team"

const router = Router()
const projectService = new ProjectService()
const teamService = new TeamService()
const studentService = new StudentService()

router.get("/:Id", validateJWT, async (req: IdRequest, res: Response ) => {
    const { Id: teamId } = req.params
    try {
        const team = teamService.getTeamById(teamId)
        res.status(200).json(team)
    } catch (error:any) {
        res.status(500).json(error)
    }
})

router.post("/:teamId/student/:studentId", validateJWT, async ( req:createTeamMemberRequest, res:Response )=>{
    const { teamId, studentId } = req.params
    const { role } = req.body
    try {
        const team = await teamService.getTeamById(teamId)
        const student = await studentService.getStudentById(studentId)
        const newTeamMember = await teamService.createTeamMember(team, student, role)
        res.status(201).json(newTeamMember)
    } catch (error:any) {
        res.status(500).json(error)
    }
})

router.post("/:Id", validateJWT, async ( req:IdRequest, res: Response )=>{
    const { Id: projectId } = req.params
    const team = req.body
    try {
        const project = await projectService.getProjectById(projectId)
        const newTeam = await teamService.createTeam(team, project)
        res.status(201).json(newTeam)
    } catch (error:any) {
        res.status(500).json(error)
    }
})

router.put("/:Id", validateJWT, async ( req: IdRequest, res:Response ) => {
    const { Id: teamId } = req.params
    const newTeam = req.body
    try {
        const team = await teamService.getTeamById(teamId)
        const updatedTeam = await teamService.updateTeam(team, newTeam)
        res.status(200).json(updatedTeam)
    } catch (error:any) {
        res.status(500).json(error)
    }
})

router.delete("/:Id", validateJWT, async ( req:IdRequest, res:Response )=>{
    const { Id: teamId } = req.params
    try {
        const team = await teamService.getTeamById(teamId)
        await teamService.deleteTeam(team)
        res.status(204).end()
    } catch (error:any) {
        res.status(500).json(error)
    }
})

export default router