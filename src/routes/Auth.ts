import { Router, Request, Response } from "express"
import UserService from "../services/User"
//Everything uses camelCase

const router = Router()

router.get("/:Id", (req: Request, res: Response) => {
    try {
        const { Id } = req.params
        const user = UserService.getUserById(Id)
        res.status(200).json({msg: user})

    } catch (error) {
        res.status(400).json({error: error})
    }
} )

router.post("/", (req:Request, res:Response) => {
    try {
        const { body } = req
        const user = UserService.createUser(body)
        res.status(200).json({res: user})
    } catch (error) {
        res.status(400).json({error: error})
    }
})

export default router