import { Router } from "express"
import { Request, Response } from "express"
import AssignmentService from "@/services/Assignment"
import { validateMiddleware } from "@/middlewares/validate"
import { validateJWT } from "@/middlewares"
import { CreateAssignmentDto } from "@/dto/Assignment"


//Everything uses camelCase, only the imported services or Dtos are in PascalCase
const router = Router()
const assignmentService = new AssignmentService()

router.get("/:Id", (req:Request, res:Response) => {
    try {
        const { Id } = req.params
        // const user = userService.getUserById(Id)
        // if(!user)throw new Error("User not found")
        res.status(200).json({ msg: Id })
    } catch (error) {
        res.status(400).json({ error: error })
    }
})

router.post("/",validateJWT, validateMiddleware(CreateAssignmentDto), async(req:Request, res:Response) => {
    try {
        const assignment = req.body
        const newAssignment = assignmentService.createAssignment(assignment)
        res.status(201).json(newAssignment)
    } catch (error) {
        res.status(400).json({ error: error })
    }
})

export default router