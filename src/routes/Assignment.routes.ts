import { Router } from "express"
import { Request, Response } from "express"
import { IdRequest } from "@/interface/requests/constant"
import { validateMiddleware } from "@/middlewares/validate"
import { validateJWT } from "@/middlewares"
import { CreateAssignmentDto } from "@/dto/Assignment"
import AssignmentService from "@/services/Assignment"
import ClassroomService from "@/services/Classroom/Classroom"
import { AssignmentStudent } from "@/entity/Assignment"
// import ClassroomService from "@/services/Classroom/Classroom"

//Everything uses camelCase, only the imported services or Dtos are in PascalCase
const router = Router()
const assignmentService = new AssignmentService()
const classroomService = new ClassroomService()
// const classroomService = new ClassroomService()

router.get("/:Id", async (req:IdRequest, res:Response) => {
    try {
        const { Id } = req.params
        const assignment = await assignmentService.getAssignmentById(Id)  
        res.status(200).json(assignment)
    } catch (error) {
        res.status(400).json({ error: error })
    }
})

router.post("/", validateJWT, validateMiddleware(CreateAssignmentDto), async (req: Request, res: Response) => {
  try {
    const assignmentDto: CreateAssignmentDto = req.body

    // Create the assignment using the service
    const Classroom = await classroomService.getClassroomById(assignmentDto.ClassroomId)
    if(!Classroom)throw new Error("Class not found")

    const newAssignment = await assignmentService.createAssignment(assignmentDto, Classroom)

    // get all the students of the classroom
    const classroomStudents = await classroomService.getStudentsByClassroom(assignmentDto.ClassroomId)

    const assignmentStudents: AssignmentStudent[] = []
    for (const classroomStudent of classroomStudents) {
      const assignmentStudent = await assignmentService.createAssignmentStudent(newAssignment, classroomStudent.Student)
      assignmentStudents.push(assignmentStudent)
    }

    res.status(201).json(newAssignment)
  } catch (error:any) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/assignments/classroom-student/:classroomStudentId", validateJWT, async (req: IdRequest, res: Response) => {
  try {
    const { Id:classroomStudentId } = req.params

    const assignments = await assignmentService.getAssignmentsByClassroomStudentId(classroomStudentId)

    res.status(200).json(assignments)
  } catch (error:any) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/assignmentStudent/:Id", validateJWT, async ( req:IdRequest, res: Response)=>{
  try {
    const { Id: classroomId } = req.params
    const assignments = await assignmentService.getAssignmentStudentsByClassroom(classroomId)
    res.status(200).json(assignments)
  } catch (error:any) {
    console.error(error)
    res.status(400).json({error:error})
  }
})

router.get("/assignmentStudent2/:Id", validateJWT, async ( req:IdRequest, res: Response)=>{
  try {
    const { Id } = req.params
    const assignments = await assignmentService.getAssignmentStudentById2(Id)
    
    res.status(200).json(assignments)
  } catch (error:any) {
    console.error(error)
    res.status(400).json({error:error})
  }
})

export default router