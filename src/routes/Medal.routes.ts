// src/routes/medal.ts
import { Router, Response } from "express";
import MedalService from "@/services/Medal";
import { validateJWT } from "@/middlewares/";
import { IdRequest } from "@/interface/requests/constant";

const router = Router();
const medalService = new MedalService();

// Obtener medallas por ID de estudiante
router.get("/student/:Id", validateJWT, async (req: IdRequest, res: Response) => {
    const { Id:studentId } = req.params;
    try {
        const medals = await medalService.getMedalsByStudent(studentId);
        res.status(200).json(medals);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva medalla para un estudiante
router.post("/student/:Id", validateJWT, async (req: IdRequest, res: Response) => {
    const { Id:studentId } = req.params;
    const { name, description } = req.body;
    try {
        const medal = await medalService.createMedal(studentId, name, description);
        res.status(201).json(medal);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
