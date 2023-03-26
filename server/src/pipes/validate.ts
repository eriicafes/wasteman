import { ValidationError } from "@/errors/ValidationError"
import { Request } from "express"
import { ZodType } from "zod"

export async function validate<T>(request: Request, schema: ZodType<T>) {
  const validatedData = await schema.spa(request.body)

  if (!validatedData.success) throw new ValidationError(validatedData.error)

  return validatedData.data
}
