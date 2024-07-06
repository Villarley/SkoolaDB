import "reflect-metadata"
import "module-alias/register"
import express, { Application } from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import AppDataSource from "./ormconfig"
import { AuthRoutes, ClassroomRoutes, AssignmentRoutes, LinkRoutes, HandableRoutes } from "./routes"


dotenv.config()

//everything needs to be written in camelCase

class Server {
    private app: Application
    private port: string
    private Path:string = "/Skoola"
    private apiPaths = { 
        auth: `${this.Path}/Auth`,
        classroom: `${this.Path}/Classroom`,
        assignment: `${this.Path}/Assignment`,
        link: `${this.Path}/Link`,
        handable: `${this.Path}/Handable`
    }

    constructor() {
        this.app = express()
        this.port = process.env["PORT"] || "8080"
        this.middlewares()
        this.routes()
        this.databaseConnection()
    }

    private middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(bodyParser.json({ limit: "200mb" }))
    }

    private routes() {
        this.app.use( this.apiPaths.link, LinkRoutes )
        this.app.use( this.apiPaths.auth , AuthRoutes )
        this.app.use( this.apiPaths.handable, HandableRoutes )
        this.app.use( this.apiPaths.classroom, ClassroomRoutes )
        this.app.use( this.apiPaths.assignment, AssignmentRoutes )
        // this.app.use("/Skoola/Person", (req, res) => res.send("Person route"))
        // this.app.use("/Skoola/Student", (req, res) => res.send("Student route"))
    }

    private async databaseConnection() {
        try {
            await AppDataSource.initialize()
            console.log("Database connected successfully")
        } catch (error) {
            console.error("Database connection failed", error)
        }
    }


    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on: ${this.port}`)
        })
    }
}

export default Server
