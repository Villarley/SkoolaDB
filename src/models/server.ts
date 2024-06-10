import express,  { Application } from "express"
class Server {
    private app: Application
    private port:string
    private apiPaths = {
        auth : "/Skoola/Auth",
        Person : "/Skoola/Person",
        Student : "/Skoola/AutStudent",

    }
    constructor(){
        this.app = express()
        this.port = process.env["PORT"] || "8080";
    }

    middlewares(){

    }
    routes() {
    }
    listen() {
        this.app.listen(this.port, ()=>{
            console.log(`Server is running on: ${this.port}`)
        })
    }
}
export default Server