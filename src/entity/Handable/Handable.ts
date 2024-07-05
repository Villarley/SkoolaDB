import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { AssignmentStudent } from "@/entity/Assignment"
import { Link, EvaluationAspect } from "@/entity/Handable"

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
    @OneToMany(() => Link, link => link.Handable)
    Links: Link[]
    @OneToMany(() => EvaluationAspect, evaluation => evaluation.Handable)
    EvaluationAspects: EvaluationAspect[]
}
export default Handable