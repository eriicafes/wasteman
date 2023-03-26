import { Context } from "@/services"
import { TypedRequest, TypedResponse } from "@/types/express"
import { Controller } from "@/utils/controller"
import { Application } from "express"

export class PingController extends Controller<Context> {
  route(app: Application) {
    this.router.get("/", this.ping.bind(this))

    this.router.register(app)
  }

  public async ping(_req: TypedRequest, res: TypedResponse) {
    res.send({
      success: true,
      message: "Ping successful",
      data: {
        ping: this.ctx.ping.getPingResponse(),
      },
    })
  }
}
