import { DataSource } from "typeorm"
import dotenv from "dotenv"

dotenv.config()

const databaseUrl = process.env["DATABASE_URL"]

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in the environment variables")
}

const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  ssl: {
    rejectUnauthorized: false
  },
  synchronize: true,
  logging:  false,
  entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"],
})

export default AppDataSource
