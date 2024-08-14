import { Router, Response } from "express"
import PostService from "@/services/Post"
import ClassroomService from "@/services/Classroom/Classroom"
import UserService from "@/services/User"
import { validateJWT } from "@/middlewares/"
import { IdRequest } from "@/interface/requests/constant"

const router = Router()
const postService = new PostService()
const userService = new UserService()
const classroomService = new ClassroomService()

router.get("/:Id", validateJWT, async (req: IdRequest, res: Response) => {
  const { Id } = req.params
  try {
    const post = await postService.getPostById(Id)
    res.status(200).json(post)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

router.get("/postsByClassroom/:Id", validateJWT, async (req: IdRequest, res: Response) => {
  const { Id: classroomId } = req.params
  try {
    const posts = await postService.getPostsByClassroomId(classroomId)
    res.status(200).json(posts)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

router.get("/postsByProject/:Id", validateJWT, async (req: IdRequest, res: Response) => {
  const { Id: projectId } = req.params
  try {
    const posts = await postService.getPostsByProjectId(projectId)
    res.status(200).json(posts)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

router.get("/postsByTeamStep/:Id", validateJWT, async (req: IdRequest, res: Response) => {
  const { Id: teamStepId } = req.params
  try {
    const posts = await postService.getPostsByTeamStepId(teamStepId)
    res.status(200).json(posts)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

router.post("/", validateJWT, async (req: IdRequest, res: Response) => {
  const post = req.body 
  try {
    console.log(post)
    const classroom = await classroomService.getClassroomById(post.Classroom)
    const user = await userService.getUserById(post.PostedBy)
    const newPost = await postService.createPost(post, user, classroom)
    res.status(201).json(newPost)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

export default router
