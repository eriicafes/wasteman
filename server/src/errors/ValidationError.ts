import { UnprocessableEntity } from "@curveball/http-errors"
import { ZodError } from "zod"

export class ValidationError extends UnprocessableEntity {
  public errors: Record<string, string[]>

  constructor(public error: ZodError) {
    super("Validation Error")

    const errors = error.formErrors.fieldErrors
    const filteredErrors = Object.entries(errors).reduce((acc, [key, issues]) => {
      acc[key] = (issues as (string | undefined)[]).filter((issue): issue is string => Boolean(issue))
      return acc
    }, {} as Record<string, string[]>)

    this.errors = filteredErrors
  }
}
