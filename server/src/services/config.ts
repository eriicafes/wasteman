import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

export class ConfigService {
  private env: Env

  constructor() {
    const validated = envSchema.safeParse(process.env)

    if (!validated.success) {
      console.error("Invalid environmanet variables:", validated.error.formErrors.fieldErrors)
      throw new Error("Invalid environment variables")
    }

    this.env = validated.data
  }

  public get<K extends keyof Env>(key: K) {
    return this.env[key]
  }
}

export type Env = z.infer<typeof envSchema>

const envSchema = z.object({
  PORT: z.string().default("5000").transform(Number),
})
