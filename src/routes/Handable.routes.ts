import { Router, Request, Response } from "express"
import HandableService from "@/services/Handable"
import { validateJWT } from "@/middlewares/"
import { validateMiddleware } from "@/middlewares/validate"
import { CreateHandableDto } from "@/dto/Handable"
import { IdRequest } from "@/interface/requests/constant"

const router = Router()
const handableService = new HandableService()

router.get("/:Id", validateJWT, async (req: IdRequest, res: Response) => {
  const { Id } = req.params
  try {
    const handable = await handableService.getHandableById(Id)
    res.status(200).json(handable)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", validateJWT, validateMiddleware(CreateHandableDto), async (req: Request, res: Response) => {
  try {
    const createHandableDto: CreateHandableDto = req.body

    const assignmentStudent = await handableService.getAssignmentStudentById(createHandableDto.AssignmentStudentId)

    const handable = await handableService.createHandable(createHandableDto, assignmentStudent)
    res.status(201).json(handable)
  } catch (error: any) {
    if (Array.isArray(error)) {
      res.status(400).json({ errors: error })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

export default router
