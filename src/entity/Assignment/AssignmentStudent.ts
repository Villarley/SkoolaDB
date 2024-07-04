import { ManyToOne, Entity, PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import { Assignment } from "@/entity/Assignment"
import { Student } from "../User"


@Entity()
class AssignmentStudent {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @ManyToOne(() => Assignment, assignment => assignment.AssignmentStudents)
    @JoinColumn()
    Assignment: Assignment
  
    @ManyToOne(() => Student, student => student.Assignments)
    @JoinColumn()
    Student: Student
}
export default AssignmentStudent