import { Repository } from "typeorm"
import Comment from "@/entity/Post/Comments"
import DataSource from "@/ormconfig"
import { User } from "@/entity/User"
import { Post } from "@/entity/Post"

class CommentService {
  private commentRepository: Repository<Comment>

  constructor() {
    this.commentRepository = DataSource.getRepository(Comment)
  }

  async getCommentsByPostId(PostId: string): Promise<Comment[]> {
    const comments = await this.commentRepository.find({ where: { Post: { Id: PostId } }, relations: ["Post", "PostedBy"] })
    if (!comments.length) throw new Error("No comments found for this post")
    return comments
  }

  async createComment(commentData: Partial<Comment>, postedBy: User, post: Post): Promise<Comment> {
    const newComment = this.commentRepository.create({
      ...commentData,
      PostedBy: postedBy,
      Post: post
    })
    await this.commentRepository.save(newComment)
    return newComment
  }

  // Additional methods for updating and deleting comments can be added here
}

export default CommentService
