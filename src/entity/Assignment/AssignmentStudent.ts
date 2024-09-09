import { ManyToOne, Entity, PrimaryGeneratedColumn, JoinColumn, OneToMany, Column } from "typeorm"
import { Assignment } from "@/entity/Assignment"
import { Student } from "../User"
import Handable from "../Handable/Handable"


@Entity()
class AssignmentStudent {
    @PrimaryGeneratedColumn("uuid")
    Id: string

    @Column({
        default: false
    })
    Handed: Boolean

    @Column({
        nullable:true,
        default: null
    })
    Grade: Number

    @ManyToOne(() => Assignment, assignment => assignment.AssignmentStudents)
    @JoinColumn()
    Assignment: Assignment
  
    @ManyToOne(() => Student, student => student.Assignments)
    @JoinColumn()
    Student: Student
    // @OneToMany()
    @OneToMany(() => Handable, handable => handable.AssignmentStudent)
    Handables: Handable[]

}
export default AssignmentStudent