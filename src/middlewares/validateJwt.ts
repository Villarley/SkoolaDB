import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt"

interface AuthRequest extends Request {
  user?: any
}

export function validateJWT(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" })
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Token missing" })
  }

  try {
    const payload = verifyToken(token as string) // Aseguramos que token sea una cadena
    req.user = payload
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}
