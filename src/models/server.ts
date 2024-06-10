import "reflect-metadata"
import express, { Application } from "express"
import cors from "cors"
import dotenv from "dotenv"
import AppDataSource from "../ormconfig" // Asegúrate de importar el archivo de configuración

dotenv.config()

class Server {
    private app: Application
    private port: string

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
    }

    private routes() {
        // this.app.use("/Skoola/Auth", (req, res) => res.send("Auth route"))
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
