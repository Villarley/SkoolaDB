import { Repository } from "typeorm"
import { Link } from "@/entity/Handable"
import DataSource from "@/ormconfig"

class LinkService {
    private linkRepository: Repository<Link>

    constructor() {
        this.linkRepository = DataSource.getRepository(Link)
    }

    async getLinkById(Id:string):Promise<Link>{
        const link = await this.linkRepository.findOne({where:{Id}})
        if(!link)throw new Error("Link not found")
        return link
    }
    
    async createLink(link:{}):Promise<Link>{
        const newLink = this.linkRepository.create(link)
        await this.linkRepository.save(newLink)
        return newLink
    }
    // async deleteLink(Id:string):Promise<Boolean>{
    //     await this.linkRepository.remove(Id)
    //     return true
    // }
}
export default LinkService