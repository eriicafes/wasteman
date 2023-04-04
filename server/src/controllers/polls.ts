import { IPoll } from "@/interfaces/poll"
import { authenticate } from "@/middlewares/authenticate"
import { PollResource } from "@/models/Poll"
import { getAuth } from "@/pipes/auth"
import { Context } from "@/services"
import { TypedRequest, TypedResponse } from "@/types/express"
import { Controller } from "@/utils/controller"
import { Router } from "express"

export class PollsController extends Controller<Context> {
  public base = "/polls"

  route(router: Router) {
    router.use(authenticate(this.ctx, "user"))

    router.get("/", this.getUserPolls)
  }

  public async getUserPolls(req: TypedRequest, res: TypedResponse<IPoll[]>) {
    const user = getAuth(req, "user")

    const polls = await this.ctx.poll.findAllForUser(user.id)

    res.json({
      success: true,
      message: "OK",
      data: polls.map(PollResource.json),
    })
  }
}
