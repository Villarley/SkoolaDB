import { Repository } from "typeorm"
import Post from "@/entity/Post/Post"
import { User } from "@/entity/User"
import DataSource from "@/ormconfig"
import { Classroom } from "@/entity/Classroom"
import { Assignment } from "@/entity/Assignment"

class PostService {
  private postRepository: Repository<Post>

  constructor() {
    this.postRepository = DataSource.getRepository(Post)
  }

  async getPostById(Id: string, relations: Boolean): Promise<Post> {
    const post = relations ? await this.postRepository.findOne({ where: { Id }, relations: ["PostedBy", "Classroom", "Assignment", "Project", "TeamStep", "Comments"] }) 
    : await this.postRepository.findOne({ where:{ Id } })
    if (!post) throw new Error("Post not found")
    return post
  }

  async createPost(postData: Partial<Post>, user: Partial<User>, Classroom: Partial<Classroom>, Assignment?: Partial<Assignment>): Promise<Post> {
    // Usa lógica condicional para agregar Assignment solo si está definido
    const newPost = this.postRepository.create({
      ...postData,
      PostedBy: user,
      Classroom,
      ...(Assignment && { Assignment }), // Solo agrega Assignment si no es undefined
    });
  
    await this.postRepository.save(newPost);
    return newPost;
  }

  async getPostsByClassroomId(classroomId: string): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: { Classroom: { Id: classroomId } },
      relations: ["Assignment", "Project", "Classroom"],
      order: {
        Date: "DESC"
      }
    });
    // if (!posts.length) throw new Error("No posts found for this classroom");
    return posts;
  }

  async getPostsByProjectId(projectId: string): Promise<Post[]> {
    const posts = await this.postRepository.find({ where: { Project: { Id: projectId } }, relations: ["Project"] })
    if (!posts.length) throw new Error("No posts found for this project")
    return posts
  }

  async getPostsByTeamStepId(teamStepId: string): Promise<Post[]> {
    const posts = await this.postRepository.find({ where: { TeamStep: { Id: teamStepId } }, relations: ["TeamStep"] })
    if (!posts.length) throw new Error("No posts found for this team step")
    return posts
  }

}

export default PostService
