import { Unauthorized } from "@curveball/http-errors"
import { Request } from "express"

type Auth<T extends "user" | "moderator"> = NonNullable<Request[T]>

/**
 * Get either authenticated User or Moderator from request, throws if not found.
 *
 * @param request Express Request
 * @param type Authentication type
 * @returns User or Moderator
 */
export function getAuth<T extends "user" | "moderator">(request: Request, type: T): Auth<T> {
  const auth = request[type]

  if (!auth) throw new Unauthorized()

  return auth
}
