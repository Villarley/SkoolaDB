import { Entity, BeforeInsert, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { v4 as uuidv4 } from "uuid"
import User from "./User"
import { AssignmentStudent } from "../Assignment"


@Entity()
class Student {
    @PrimaryGeneratedColumn("uuid")
    Id: string

    @BeforeInsert()
    generateId() {
        if (!this.Id) {
            this.Id = uuidv4()
        }
    }

    @OneToOne(() => User)   
    @JoinColumn()
    User: User
    @OneToMany(() => AssignmentStudent, assignmentStudent => assignmentStudent.Student)
    Assignments: AssignmentStudent[]
}
export default Student