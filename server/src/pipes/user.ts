import { Unauthorized } from "@curveball/http-errors"
import { Request } from "express"

export function getUser(request: Request) {
  if (!request.user) throw new Unauthorized()

  return request.user
}
