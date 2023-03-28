import { Context } from "@/services"
import { TypedRequest, TypedResponse } from "@/types/express"
import { Controller } from "@/utils/controller"
import { Router } from "express"

export class PingController extends Controller<Context> {
  route(router: Router) {
    router.get("/", this.ping)
  }

  public async ping(_req: TypedRequest, res: TypedResponse<{ ping: string }>) {
    res.send({
      success: true,
      message: "Ping successful",
      data: {
        ping: this.ctx.ping.getPingResponse(),
      },
    })
  }
}
