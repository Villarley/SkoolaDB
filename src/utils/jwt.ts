import jwt from 'jsonwebtoken'

const secretKey:string = process.env["JWT_SECRET"] || ""

interface JwtPayload {
  Id: string
  Email: string
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, secretKey, { expiresIn: '72h' })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, secretKey) as JwtPayload
}
