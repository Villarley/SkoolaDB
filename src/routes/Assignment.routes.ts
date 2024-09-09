import { Router } from "express"
import { Request, Response } from "express"
import { IdRequest } from "@/interface/requests/constant"
import { validateMiddleware } from "@/middlewares/validate"
import { validateJWT } from "@/middlewares"
import { CreateAssignmentDto } from "@/dto/Assignment"
import AssignmentService from "@/services/Assignment"
import ClassroomService from "@/services/Classroom/Classroom"
import HandableService from "@/services/Handable"
import StepService from "@/services/Step"
import PostService from "@/services/Post"
import UserService from "@/services/User"
import { PostType } from "@/Enum"
// import ClassroomService from "@/services/Classroom/Classroom"

//Everything uses camelCase, only the imported services or Dtos are in PascalCase
const router = Router()
const assignmentService = new AssignmentService()
const classroomService = new ClassroomService()
const handableService = new HandableService()
const stepService = new StepService()
const postService = new PostService()
const userService = new UserService()
// const classroomService = new ClassroomService()

interface studentAssignmentRequest extends Request {
  params: {
    studentId: string,
    assignmentId:string,
  }
}


router.get("/:Id", async (req:IdRequest, res:Response) => {
    try {
        const { Id } = req.params
        const assignment = await assignmentService.getAssignmentById(Id)  
        
        const structuredAssignment = {
          Id: assignment.Id,
          Title: assignment.Title,
          Instructions: assignment.Instructions,
          DateToComplete: assignment.DateToComplete,
          Classroom: {
            ClassroomProfessor: assignment.Classroom.ClassroomProfessors[0]?.Professor.User.Name + " " + assignment.Classroom.ClassroomProfessors[0]?.Professor.User.LastName1 + " " +  assignment.Classroom.ClassroomProfessors[0]?.Professor.User.LastName2 ,
            ...assignment.Classroom
          }
        }
        res.status(200).json(structuredAssignment)
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
    
      
      let newAssignment
      if(!assignmentDto.TeamStepId){
        newAssignment = await assignmentService.createAssignment(assignmentDto, Classroom)
      }else{
        const TeamStep = await stepService.getTeamStepById(assignmentDto.TeamStepId)
        newAssignment = await assignmentService.createAssignmentTeamStep(assignmentDto, Classroom, TeamStep)
      }
      const postData = {
        Title : assignmentDto.Title,
        Description : assignmentDto.Instructions,
        Date : new Date(),
        PostType : PostType.ASSIGNMENT
      }
      const user = await userService.getUserById(assignmentDto.PostedBy)
      await postService.createPost(postData, user, Classroom, newAssignment)


    // get all the students of the classroom
    const classroomStudents = await classroomService.getStudentsByClassroom(assignmentDto.ClassroomId)

    // creating all the necesary entities for every es
    for (const classroomStudent of classroomStudents) {
      const assignmentStudent = await assignmentService.createAssignmentStudent(newAssignment, classroomStudent.Student)
      await handableService.createHandable(assignmentStudent)
    }

    res.status(201).json(newAssignment)
  } catch (error:any) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/Pending/:Id", validateJWT, async ( req:IdRequest, res:Response ) => {
  try {
    const { Id } = req.params
    const assignments = await assignmentService.getPendingAssignmentsByStudent(Id)
    res.status(200).json(assignments)
  } catch (error:any) {
    console.error(error)
    res.status(400).json({error:error})
  }
})

router.get("/assignments/classroom-student/:classroomStudentId", validateJWT, async (req: IdRequest, res: Response) => {
  try {
    const { Id:classroomStudentId } = req.params
    console.log("gola")
    const assignments = await assignmentService.getAssignmentsByClassroomStudentId(classroomStudentId)

    res.status(200).json(assignments)
  } catch (error:any) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/assignmentStudent/:Id", validateJWT, async ( req:IdRequest, res: Response)=>{
  try {
    const { Id: classroomId } = req.params
    console.log("hola");
    
    const assignments = await assignmentService.getAssignmentStudentsByClassroom(classroomId)
    res.status(200).json(assignments)
  } catch (error:any) {
    console.error(error)
    res.status(400).json({error:error})
  }
})

router.get("/assignmentStudents/:Id", validateJWT, async (req: IdRequest, res: Response) => {
  const { Id:assignmentId } = req.params
  try {
    const assignmentStudents = await assignmentService.getAssignmentStudentsByAssignmentId(assignmentId)
    res.status(200).json(assignmentStudents)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
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

router.get("/studentAssignment/:assignmentId/:studentId", validateJWT, async (req: studentAssignmentRequest, res: Response) => {
  const { assignmentId, studentId } = req.params;
  
  try {
    console.log("si")
    const studentAssignment = await assignmentService.getAssignmentStudentByAssignmentIdAndStudentId(assignmentId, studentId);
    
    if (!studentAssignment) {
      return res.status(404).json({ error: "Student assignment not found" });
    }
    
    return res.status(200).json(studentAssignment);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
})

export default router