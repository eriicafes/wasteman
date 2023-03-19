import { UnprocessableEntity } from "@curveball/http-errors"

export class ValidationError extends UnprocessableEntity {
  constructor(public errors: Record<string, string[]>) {
    super("Validation Error")
  }
}
