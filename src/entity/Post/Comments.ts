import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "@/entity/User"
import Post from "./Post"

@Entity()
class Comment {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @Column()
  Content: string

  @OneToOne(() => User)   
  @JoinColumn()
  PostedBy: User

  @ManyToOne(() => Post, post => post.Comments)
  Post: Post

}

export default Comment
