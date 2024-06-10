import express,  { Application } from "express"
import cors from "cors"
class Server {
    private app: Application
    private port:string
    private apiPaths = {
        Auth : "/Skoola/Auth",
        Person : "/Skoola/Person",
        Student : "/Skoola/AuthStudent",

    }
    constructor(){
        this.app = express()
        this.port = process.env["PORT"] || "8080"
    }

    middlewares(){
        //CORS
        this.app.use( cors())
        //lectura del body
        this.app.use( express.json())
    }
    routes() {
    }
    listen() {
        this.app.listen(this.port, () =>  {
            console.log(`Server is running on: ${this.port}`)
        })
    }
}
export default Server