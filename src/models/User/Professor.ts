import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { v4 as uuidv4 } from "uuid"
import { User } from "./User"


@Entity()
export class Professor {
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

}