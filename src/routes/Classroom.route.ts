import { Router, Response } from "express"
import { CreateClassroomDto } from "@/dto/Classroom"
import ClassroomService from "@/services/Classroom/Classroom"
import { validateMiddleware } from "@/middlewares/validate"
import { validateJWT } from "@/middlewares/"
import { 
  CreateClassroomRequest, 
  JoinClassroomRequest, 
  GetClassroomsByStudentRequest, 
  GetClassroomsByProfessorRequest, 
  GetClassroomByIdRequest 
} from "@/interface/requests/Classroom"

const router = Router()
const classroomService = new ClassroomService()

// Route to create a classroom and assign a professor
router.post("/:professorId", validateJWT, validateMiddleware(CreateClassroomDto), async (req: CreateClassroomRequest, res: Response) => {
  const { professorId } = req.params

  try {
    const classroom = await classroomService.createClassroom(req.body)
    await classroomService.assignProfessorToClassroom(professorId, classroom)
    res.status(201).json(classroom)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Route for a student to join a classroom
router.post("/:classroomId/join/:studentId", validateJWT, async (req: JoinClassroomRequest, res: Response) => {
  const { classroomId, studentId } = req.params

  try {
    const classroom = await classroomService.getClassroomById(classroomId)
    const classroomStudent = await classroomService.joinClassroom(studentId, classroom)
    res.status(201).json( classroomStudent )
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Route to get classrooms by student
router.get("/student/:studentId", validateJWT, async (req: GetClassroomsByStudentRequest, res: Response) => {
  const { studentId } = req.params

  try {
    const classrooms = await classroomService.getClassroomsByStudent(studentId)
    res.status(200).json(classrooms)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Route to get classrooms by professor
router.get("/professor/:professorId", validateJWT, async (req: GetClassroomsByProfessorRequest, res: Response) => {
  const { professorId } = req.params

  try {
    const classrooms = await classroomService.getClassroomsByProfessor(professorId)
    res.status(200).json(classrooms)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Route to get a specific classroom by ID
router.get("/:classroomId", validateJWT, async (req: GetClassroomByIdRequest, res: Response) => {
  const { classroomId } = req.params

  try {
    const classroom = await classroomService.getClassroomById(classroomId)
    res.status(200).json(classroom)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router
