import { Router, Request, Response } from "express"
import HandableService from "@/services/Handable"
import { validateJWT } from "@/middlewares/"
import { validateMiddleware } from "@/middlewares/validate"
import { CreateHandableDto } from "@/dto/Handable"
import { IdRequest } from "@/interface/requests/constant"
import MedalService from "@/services/Medal"

const router = Router()
const medalService = new MedalService()
const handableService = new HandableService()
interface handableRequest extends Request {
  params: {
    Id: string
  }
  body:{
    Grade: number
  }
}

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

    const handable = await handableService.createHandable( assignmentStudent )
    res.status(201).json(handable)
  } catch (error: any) {
    if (Array.isArray(error)) {
      res.status(400).json({ errors: error })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.put("/:Id", validateJWT, async (req: handableRequest, res: Response) => {
  const { Id } = req.params;
  const { Grade } = req.body;

  try {
    const existingHandable = await handableService.getHandableById(Id);
    const existingHandable2 = await handableService.getHandableById2(Id);

    console.log(existingHandable);
    

    if (!existingHandable || !existingHandable2) {
      return res.status(404).json({ error: "Handable not found" });
    }

    // Actualizar la fecha de entrega a la fecha actual si no está establecida
    if (!existingHandable2.DateHanded) {
      existingHandable.DateHanded = new Date();
    }

    const updatedHandable = await handableService.updateHandable(existingHandable, { Grade });

    const studentId = existingHandable2.AssignmentStudent.Student.Id;

    // Asignar "Sello Supremo" si la nota es 100
    if (Grade == 100) {
      await medalService.createMedal(studentId, "Sello Supremo", "Medalla otorgada por obtener la máxima calificación.");
    }

    // Verificar si DateHanded y DateToComplete no son undefined antes de usarlos
    const dateHanded = existingHandable2.DateHanded ? new Date(existingHandable2.DateHanded) : null;
    const dateToComplete = existingHandable2.AssignmentStudent.Assignment.DateToComplete ? new Date(existingHandable2.AssignmentStudent.Assignment.DateToComplete) : null;

    if (dateHanded && dateToComplete) {
      // Calcular la diferencia de días entre DateToComplete y DateHanded
      const timeToComplete = (dateHanded.getTime() - dateToComplete.getTime()) / (1000 * 3600 * 24);

      // Asignar "Velocistar" si el trabajo se entregó antes de la fecha límite
      if (timeToComplete <= 0) {
        await medalService.createMedal(studentId, "Velocistar", "Medalla otorgada por rapidez en la entrega.");
      }
    }

    return res.status(200).json(updatedHandable);
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ error: error.message });
  }
})

export default router
