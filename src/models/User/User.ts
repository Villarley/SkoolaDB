import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm"
import { v4 as uuidv4 } from "uuid"
import { AuthMethodEnum } from "../Enum"

//Every column needs to be in PascalCase

@Entity()
export class User {

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
    LastName1: string

    @Column()
    LastName2: string

    @Column()
    Email: string

    @Column()
    Password: string

    @Column({
        type: "enum",
        enum: AuthMethodEnum,
        default: AuthMethodEnum.Plain

    })
    AuthMethod : AuthMethodEnum
}
