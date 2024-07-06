import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import Handable from "./Handable"
import { LinkType } from "@/Enum"

@Entity()
class Link {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Link: string
    @Column({
        type: "enum",
        enum: LinkType,
        default: LinkType.FILE
    })
    LinkType: LinkType
    @ManyToOne(() => Handable, { cascade: true })
    @JoinColumn()
    Handable: Handable
}
export default Link