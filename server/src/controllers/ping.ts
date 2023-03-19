import { TypedRequest, TypedResponse } from "@/types"
import { Controller } from "@/utils/controller"
import { Application } from "express"

export class PingController extends Controller {
  route(app: Application) {
    this.router.get("/", this.ping)

    this.router.register(app)
  }

  public async ping(_req: TypedRequest, res: TypedResponse) {
    res.send({
      success: true,
      message: "Ping successful",
      data: {
        ping: this.container.ping.getPingResponse(),
      },
    })
  }
}
