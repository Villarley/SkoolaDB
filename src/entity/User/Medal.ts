import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from "typeorm"
import { v4 as uuidv4 } from "uuid"
import Student from "./Student"

@Entity()
class Medal {
    @PrimaryGeneratedColumn("uuid")
    Id: string

    @BeforeInsert()
    generateId() {
        if (!this.Id) {
            this.Id = uuidv4()
        }
    }

    @Column()
    Name: string

    @Column()
    Description: string

    @ManyToOne(() => Student, student => student.Medals)
    Student: Student
}

export default Medal