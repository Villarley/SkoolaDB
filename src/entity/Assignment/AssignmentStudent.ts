import { ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Assignment } from "@/entity/Assignment"
import { Student } from "../User"


@Entity()
class AssignmentStudent {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @ManyToOne(() => Assignment, {cascade:true})
    Assignment: Assignment
    
    @ManyToOne(() => Student, {cascade:true})
    Student: Student
}
export default AssignmentStudent