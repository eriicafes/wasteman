import { ModeratorResource } from "@/models/Moderator"
import { UserResource } from "@/models/User"
import { Context } from "@/services"
import { Unauthorized } from "@curveball/http-errors"
import { Request, RequestHandler } from "express"

export function authenticate(ctx: Context, type: "user" | "moderator" | "all"): RequestHandler {
  return async (req, _res, next) => {
    try {
      const token = getTokenFromHeaders(req)
      if (!token) throw new Unauthorized("Missing bearer token")

      const authenticateUser = async () => {
        const { user } = await ctx.auth.verifyToken(token)
        req.user = UserResource.json(user)
      }

      const authenticateModerator = async () => {
        const { moderator } = await ctx.moderatorAuth.verifyToken(token)
        req.moderator = ModeratorResource.json(moderator)
      }

      // authenticate user
      if (type === "user") await authenticateUser()
      // authenticate moderator
      if (type === "moderator") await authenticateModerator()
      // authenticate user or moderator
      if (type === "all") await Promise.allSettled([authenticateUser(), authenticateModerator()])

      next()
    } catch (err) {
      next(new Unauthorized())
    }
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
