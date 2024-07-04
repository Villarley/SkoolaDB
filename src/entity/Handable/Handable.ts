import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { AssignmentStudent } from "@/entity/Assignment"

@Entity()
class Handable {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    DateHanded: Date
    @Column()
    Grade: number
    @ManyToOne(() => AssignmentStudent, { cascade: true })
    @JoinColumn()
    AssignmentStudent: AssignmentStudent
}
export default Handable