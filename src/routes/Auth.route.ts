import { Router, Request, Response } from "express"
import UserService from "@/services/User"
import { validateMiddleware } from "@/middlewares/validate"
import { validateJWT } from "@/middlewares/"
import { UserInputDto } from "@/dto/User"
import StudentService from "@/services/Student"
import ProfessorService from "@/services/Professor"
//Everything uses camelCase, only the imported services or Dtos are in PascalCase

const router = Router()
const userService = new UserService()
const studentService = new StudentService()
const professorService = new ProfessorService()


interface CustomRequest extends Request {
  params:{
    Role?: string
  }
}

router.get("/:Id", validateJWT, (req: Request, res: Response) => {
  try {
    const { Id } = req.params
    // const user = userService.getUserById(Id)
    // if(!user)throw new Error("User not found")
    res.status(200).json({ msg: Id })
  } catch (error) {
    res.status(400).json({ error: error })
  }
})
router.get("/", async (res: Response) => {
  try {
    const users = await userService.getAllUsers()
    console.log(users)
    res.status(200).json({ users })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" })
    }

    const user = await userService.getUserByEmail(email)

    if (!user) {
      res.status(404).json({ message: "User not found" })
    }
    let loggedUser, token, roleId
    if (user.AuthMethod === "PLAIN") {
      ({ user: loggedUser, token, roleId } = await userService.login(email, password))
    } else if (user.AuthMethod === "GOOGLE") {
      ({ user: loggedUser, token, roleId } = await userService.loginWithGoogle(email))
    } else {
      res.status(400).json({ message: "Unsupported authentication method" })
    }

    res.status(200).json({ user: loggedUser, token, roleId  })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

router.post(
  "/:Role",
  validateMiddleware(UserInputDto),
  async(req: CustomRequest, res: Response) => {
    try {
      const { body } = req
      const { Role } = req.params
      const user = await userService.createUser(body)
      if(Role === "professor"){
        await professorService.createProfessor(user.Id)
      }else if(Role === "student"){
        await studentService.createStudent(user.Id)
      }
      res.status(200).json( user )
    } catch (error) {
      console.error(error)
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
