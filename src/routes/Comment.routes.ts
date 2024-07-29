import { Router, Response } from "express"
import CommentService from "@/services/Comment"
import { validateJWT } from "@/middlewares/"
import { IdRequest } from "@/interface/requests/constant"

const router = Router()
const commentService = new CommentService()

router.get("/post/:PostId", validateJWT, async (req: IdRequest, res: Response) => {
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
    const newComment = await commentService.createComment(commentData)
    res.status(201).json(newComment)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

// Additional routes for updating and deleting comments can be added here

export default router
