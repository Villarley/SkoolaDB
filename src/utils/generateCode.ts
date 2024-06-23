import AppDataSource from "@/ormconfig"
import {Classroom} from "@/entity/Classroom"

export async function generateUniqueClassCode(): Promise<string> {
  const generateCode = (): string => {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
  }

  let unique = false
  let code = ""

  while (!unique) {
    code = generateCode()
    const existingClass = await AppDataSource.manager.findOneBy(Classroom, { Code: code })
    if (!existingClass) {
      unique = true
    }
  }

  return code
}
