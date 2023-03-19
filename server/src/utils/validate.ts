import { ValidationError } from "@/errors/ValidationError"
import { ZodType } from "zod"

export async function validate<T>(schema: ZodType<T>, data: any) {
  const validatedData = await schema.spa(data)

  if (!validatedData.success) {
    const errors = validatedData.error.formErrors.fieldErrors
    const filteredErrors = Object.entries(errors).reduce((acc, [key, issues]) => {
      acc[key] = (issues as (string | undefined)[]).filter((issue): issue is string => Boolean(issue))
      return acc
    }, {} as Record<string, string[]>)

    throw new ValidationError(filteredErrors)
  }

  return validatedData.data
}
