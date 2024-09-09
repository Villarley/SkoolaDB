import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from "typeorm"
import Handable from "./Handable"

@Entity()
class EvaluationAspect{
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Aspect: string
    @Column()
    Points: number
    @ManyToOne(() => Handable, { cascade: true })
    @JoinColumn()
    Handable: Handable

}
export default EvaluationAspect