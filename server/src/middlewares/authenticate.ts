import { UserResource } from "@/models/User"
import { Context } from "@/services"
import { Unauthorized } from "@curveball/http-errors"
import { Request, RequestHandler } from "express"

export function authenticate(ctx: Context): RequestHandler {
  return async (req, _res, next) => {
    const token = getTokenFromHeaders(req)
    if (!token) throw new Unauthorized("Missing bearer token")

    const { user } = await ctx.auth.verifyToken(token)

    req.user = UserResource.json(user)

    next()
  }
}

function getTokenFromHeaders(req: Request) {
  // get bearer token from headers
  const bearerToken = req.headers["authorization"]
  if (!bearerToken) return undefined

  // get jwt token from bearer token
  const token = bearerToken.split("Bearer ")[1]
  if (!token) return undefined

  return token
}
