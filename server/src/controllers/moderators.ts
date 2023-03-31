import { IModerator } from "@/interfaces/moderator"
import { TokenPayload } from "@/interfaces/token"
import { authenticate } from "@/middlewares/authenticate"
import { ModeratorResource } from "@/models/Moderator"
import { getAuth } from "@/pipes/auth"
import { validate } from "@/pipes/validate"
import { Context } from "@/services"
import { Params, TypedRequest, TypedResponse } from "@/types/express"
import { Controller } from "@/utils/controller"
import { Router } from "express"
import { z } from "zod"

export class ModeratorsController extends Controller<Context> {
  public base = "/moderators"

  route(router: Router) {
    router.get("/auth/profile", authenticate(this.ctx, "moderator"), this.getProfile)
    router.post("/auth/signin", this.signin)

    // authenticated routes
    router.use(authenticate(this.ctx, "moderator"))

    router.post("/", this.createModerator)
    router.get("/", this.getModerators)
    router.get("/:id", this.getModerator)
  }

  public async getProfile(req: TypedRequest, res: TypedResponse<IModerator>) {
    const moderator = getAuth(req, "moderator")

    res.json({
      success: true,
      message: "OK",
      data: moderator,
    })
  }

  public async signin(req: TypedRequest, res: TypedResponse<TokenPayload>) {
    const { email, password } = await validate(req, ModeratorsSchema.signin)

    const { token } = await this.ctx.moderatorAuth.authenticate(email, password)

    res.json({
      success: true,
      message: "Authenticated successfully",
      data: { token },
    })
  }

  public async createModerator(req: TypedRequest, res: TypedResponse<IModerator>) {
    const data = await validate(req, ModeratorsSchema.create)

    const moderator = await this.ctx.moderator.create(data)

    res.json({
      success: true,
      message: "OK",
      data: ModeratorResource.json(moderator),
    })
  }

  public async getModerators(req: TypedRequest, res: TypedResponse<IModerator[]>) {
    const moderators = await this.ctx.moderator.findAll()

    res.json({
      success: true,
      message: "OK",
      data: moderators.map(ModeratorResource.json),
    })
  }

  public async getModerator(req: TypedRequest<Params<"id">>, res: TypedResponse<IModerator>) {
    const moderator = await this.ctx.moderator.findById(req.params.id)

    if (!moderator) {
      return res.status(404).json({
        success: false,
        message: "Moderator not found",
      })
    }

    res.json({
      success: true,
      message: "OK",
      data: ModeratorResource.json(moderator),
    })
  }
}

class ModeratorsSchema {
  public static signin = z.object({
    email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email(),
    password: z.string({ required_error: "Password is required" }).min(1, "Password is required"),
  })

  public static create = z.object({
    email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email(),
    password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
    firstName: z.string({ required_error: "First name is required" }).min(1, "First name is required"),
    lastName: z.string({ required_error: "Last name is required" }).min(1, "Last name is required"),
  })
}
