import { Repository } from "typeorm"
import { Project } from "@/entity/Project"
import DataSource from "@/ormconfig"

class LinkService {
    private projectRepository: Repository<Project>

    constructor() {
        this.projectRepository = DataSource.getRepository(Project)
    }

    async getProjectById(Id:string):Promise<Project>{
        const project = await this.projectRepository.findOne({where:{Id}})
        if(!project)throw new Error("Project not found")
        return project
    }
    
    async createProject(project:{}, classroom:{}):Promise<Project>{
        const newProject = this.projectRepository.create({...project, Classroom: classroom})
        await this.projectRepository.save(newProject)
        return newProject
    }

    async getProjectsByClassroomId(classroomId:string):Promise<Project[]>{
        const project = await this.projectRepository.find({where:{Classroom:{Id: classroomId}}, relations:["Classroom"]})
        if(!project)throw new Error("Project not found")
        return project
    }

    async getProjectsByStudentId(studentId:string):Promise<Project[]>{
        console.log(studentId)
        const project = await this.projectRepository.find({where: { Classroom : { ClassroomStudents: { Student: { Id: studentId } } } } })
        if(!project)throw new Error("Project not found")
        return project
    }
    // async deleteLink(Id:string):Promise<Boolean>{
    //     await this.projectRepository.remove(Id)
    //     return true
    // }
}
export default LinkService