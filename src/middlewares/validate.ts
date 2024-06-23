import { Request, Response, NextFunction } from "express"
import { plainToInstance } from "class-transformer"
import { validate, ValidationError } from "class-validator"

export function validateMiddleware(type: any): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(type, req.body)
    const errors: ValidationError[] = await validate(dto)

    if (errors.length > 0) {
      const message = errors.map(error => Object.values(error.constraints || {}).join(", ")).join(" ")
      res.status(400).json({ message })
      return
    }

    next()
  }
}
