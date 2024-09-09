import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { User } from "@/entity/User"
import Post from "./Post"

@Entity()
class Comment {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @Column()
  Content: string

  @ManyToOne(() => User)
  @JoinColumn()
  PostedBy: User

  @ManyToOne(() => Post, post => post.Comments)
  Post: Post

}

export default Comment
