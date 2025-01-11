import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "@/entity/User"
import Comment from "./Comments"
import { PostType } from "@/Enum"
import { Classroom } from "@/entity/Classroom"
import { Assignment } from "@/entity/Assignment"
import { Project } from "@/entity/Project"
import { TeamStep } from "@/entity/Project"

@Entity()
class Post {
  @PrimaryGeneratedColumn("uuid")
  Id: string

  @Column()
  Title: string

  @Column()
  Description: string

  @Column()
  Date: Date

  @Column({
    type: "enum",
    enum: PostType,
    default: PostType.ANNOUNCEMENT
  })
  PostType: PostType

  @ManyToOne(() => User)
  @JoinColumn()
  PostedBy: User

  @ManyToOne(() => Classroom, { nullable: true })
  @JoinColumn()
  Classroom: Classroom

  @OneToOne(() => Assignment, { nullable: true })
  @JoinColumn()
  Assignment: Assignment

  @OneToOne(() => Project, { nullable: true })
  @JoinColumn()
  Project: Project

  @ManyToOne(() => TeamStep, { nullable: true })
  @JoinColumn()
  TeamStep: TeamStep

  @OneToMany(() => Comment, comment => comment.Post)
  Comments: Comment[]
}

export default Post
