import { Router, Response } from "express"
import ProjectService from "@/services/Project"
import ClassroomService from "@/services/Classroom/Classroom"
import { validateJWT } from "@/middlewares/"
import { IdRequest } from "@/interface/requests/constant"

const router = Router()
const projectService = new ProjectService()
const classroomService = new ClassroomService()

router.get("/:Id", validateJWT, async (req: IdRequest, res: Response) => {
  const { Id } = req.params
  try {
    const project = await projectService.getProjectById(Id)
    res.status(200).json(project)
  } catch (error: any) {
    res.status(500).json(error)
  }
})

router.get("/projectsByClassroom/:Id", validateJWT, async (req: IdRequest, res: Response)=>{
    const { Id: classroomId } = req.params
    try {
        const project = await projectService.getProjectsByClassroomId(classroomId)
        res.status(200).json(project)
    } catch (error: any) {
        res.status(500).json(error)
    }
})

router.get("/projectsByStudentId/:Id", validateJWT, async (req:IdRequest, res: Response) => {
    const { Id: studentId } = req.params
    try {
        console.log("hola soy yo")
        const projects = await projectService.getProjectsByStudentId(studentId)
        res.status(200).json(projects)
    } catch (error: any) {
        res.status(500).json(error)
    }
})

//receiving the classroomId in the url
router.post("/:Id", validateJWT, async (req:IdRequest, res:Response) => {
    const { Id: classroomId } = req.params
    const project = req.body
    try {
        const classroom  = await classroomService.getClassroomById(classroomId)
        const newProject = await projectService.createProject(project, classroom)
        res.status(201).json(newProject)
    } catch (error: any) {
        res.status(500).json(error)
    }
})

export default router