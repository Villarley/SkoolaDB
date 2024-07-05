import { Repository } from "typeorm"
import { Handable } from "@/entity/Handable"
import DataSource from "@/ormconfig"

class HandableService {
    private handableRepository: Repository<Handable>
    
    constructor(){
        this.handableRepository = DataSource.getRepository(Handable)
    }

    async getHandableById(Id:string):Promise<Handable>{
        const handable = await this.handableRepository.findOne({where:{Id}})
        if(!handable){
            throw new Error("Handable not found")
        }
        return handable
    }
    async createHandable(handable: Handable):Promise<Handable>{
        const createHandable = this.handableRepository.create(handable)
        const createdHandable = await this.handableRepository.save(createHandable)
        return createdHandable
    }
}
export default HandableService