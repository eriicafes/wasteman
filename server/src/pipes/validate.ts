import { ValidationError } from "@/errors/ValidationError"
import { Request } from "express"
import { ZodType, ZodTypeDef } from "zod"

/**
 * Validate request body or query.
 *
 * @param request Express Request
 * @param schema Zod schema
 * @param field Validation field
 * @returns Validated data
 */
export async function validate<Input, Def extends ZodTypeDef = ZodTypeDef, Output = Input>(
  request: Request,
  schema: ZodType<Input, Def, Output>,
  field: "body" | "query" = "body"
) {
  const validatedData = await schema.spa(request[field])

  if (!validatedData.success) throw new ValidationError(validatedData.error)

  return validatedData.data
}
