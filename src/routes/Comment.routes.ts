import { Router, Response } from "express"
import { validateJWT } from "@/middlewares/"
import { IdRequest } from "@/interface/requests/constant"
import CommentService from "@/services/Comment"
import UserService from "@/services/User"
import PostService from "@/services/Post"

const router = Router()
const commentService = new CommentService()
const userService = new UserService()
const postService = new PostService()

router.get("/:PostId", validateJWT, async (req: IdRequest, res: Response) => {
  const { Id:PostId } = req.params
  try {
    const comments = await commentService.getCommentsByPostId(PostId)
    res.status(200).json(comments)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

router.post("/", validateJWT, async (req: IdRequest, res: Response) => {
  const commentData = req.body
  try {
    const user = await userService.getUserById(commentData.PostedBy)
    const post = await postService.getPostById(commentData.PostId, false)
    const newComment = await commentService.createComment(commentData, user, post)
    res.status(201).json(newComment)
  } catch (error: any) {
    console.error(error)
    res.status(500).json(error.message)
  }
})

export default router
