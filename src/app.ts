import dotenv from "dotenv"
import Server from "./entity/server"
import "reflect-metadata"

dotenv.config()

const server = new Server()

server.listen()