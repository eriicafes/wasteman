import { TokenPayload } from "@/interfaces/token"
import { IUser } from "@/interfaces/user"
import { authenticate } from "@/middlewares/authenticate"
import { getUser } from "@/pipes/user"
import { validate } from "@/pipes/validate"
import { Context } from "@/services"
import { TypedRequest, TypedResponse } from "@/types/express"
import { Controller } from "@/utils/controller"
import { Router } from "express"
import { z } from "zod"

export class AuthController extends Controller<Context> {
  public base = "/auth"

  route(router: Router) {
    router.get("/profile", authenticate(this.ctx), this.getProfile)
    router.post("/signin", this.signin)
    router.post("/signup", this.signup)
  }

  /**
   * Get authenticated user
   */
  public async getProfile(req: TypedRequest, res: TypedResponse<IUser>) {
    const user = getUser(req)

    res.json({
      success: true,
      message: "OK",
      data: user,
    })
  }

  /**
   * Authenticate user with email and password.
   */
  public async signin(req: TypedRequest, res: TypedResponse<TokenPayload>) {
    const { email, password } = await validate(req, AuthSchema.signin)

    const { token } = await this.ctx.auth.authenticateWithPassword(email, password)

    res.json({
      success: true,
      message: "Authenticated successfully",
      data: { token },
    })
  }

  /**
   * Create user with email and password.
   */
  public async signup(req: TypedRequest, res: TypedResponse<TokenPayload>) {
    const { email, password, ...data } = await validate(req, AuthSchema.signup)

    const { token } = await this.ctx.auth.createWithPassword(email, password, data)

    res.json({
      success: true,
      message: "Account created successfully",
      data: { token },
    })
  }
}

class AuthSchema {
  public static signin = z.object({
    email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email(),
    password: z.string({ required_error: "Password is required" }).min(1, "Password is required"),
  })

  public static signup = z.object({
    email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email(),
    password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
    firstName: z.string({ required_error: "First name is required" }).min(1, "First name is required"),
    lastName: z.string({ required_error: "Last name is required" }).min(1, "Last name is required"),
  })
}
