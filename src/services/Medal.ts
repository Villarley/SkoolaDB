// src/services/MedalService.ts
import { Repository } from "typeorm";
import DataSource from "@/ormconfig";
import Medal from "@/entity/User/Medal";
import Student from "@/entity/User/Student";

class MedalService {
    private medalRepository: Repository<Medal>;
    private studentRepository: Repository<Student>;

    constructor() {
        this.medalRepository = DataSource.getRepository(Medal);
        this.studentRepository = DataSource.getRepository(Student);
    }

    async createMedal(studentId: string, name: string, description: string): Promise<Medal> {
        const student = await this.studentRepository.findOne({ where: { Id: studentId } });
        if (!student) throw new Error("Student not found");

        const medal = this.medalRepository.create({
            Name: name,
            Description: description,
            Student: student,
        });

        return await this.medalRepository.save(medal);
    }

    async getMedalsByStudent(studentId: string): Promise<Medal[]> {
        return await this.medalRepository.find({ where: { Student: { Id: studentId } } });
    }
}

export default MedalService;
