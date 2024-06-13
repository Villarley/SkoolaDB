import { Router, Request, Response } from "express"
import UserService from "../services/User"
import { validateMiddleware } from "../middlewares/validate"
import { UserInputDto } from "../dto/User"
//Everything uses camelCase

const router = Router()
const userService = new UserService()

router.get("/:Id", (req: Request, res: Response) => {
  try {
    const { Id } = req.params
    // const user = userService.getUserById(Id)
    // if(!user)throw new Error("User not found")
    res.status(200).json({ msg: Id })
  } catch (error) {
    res.status(400).json({ error: error })
  }
})
router.get("/", async ( res: Response ) => {
  try {
    const users = await userService.getAllUsers()
    console.log(users)
    res.status(200).json({ users })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post(
  "/",
  validateMiddleware(UserInputDto),
  (req: Request, res: Response) => {
    try {
      const { body } = req
      const user = userService.createUser(body)
      res.status(200).json({ res: user })
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }
)

// router.put("/", (req:Request, res: Response) => {
//     try {
//         const { body } = req
//         const user = userService.updateUser(body)
//         res.status(200).json({res: user})
//     } catch (error) {
//         res.status(400).json({error: error})
//     }
// })

export default router
