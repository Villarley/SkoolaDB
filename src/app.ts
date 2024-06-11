import dotenv from "dotenv"
import Server from "./models/server"
import "reflect-metadata"

dotenv.config()

const server = new Server()

server.listen()