import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

export class ConfigService {
  public env: Env

  constructor() {
    const validated = envSchema.safeParse(process.env)

    if (!validated.success) {
      console.error("Invalid environmanet variables:", validated.error.formErrors.fieldErrors)
      throw new Error("Invalid environment variables")
    }

    this.env = validated.data
  }
}

export type Env = z.infer<typeof envSchema>

const envSchema = z.object({
  NODE_ENV: z.string().default("production"),
  PORT: z.string().default("5000").transform(Number),
  SECRET: z.string(),
  MONGO_URI: z.string(),
})
