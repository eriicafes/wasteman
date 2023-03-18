import { Controller } from "@/utils/controller"
import { Application, Request, Response } from "express"

export class PingController extends Controller {
  route(app: Application) {
    this.router.get("/", this.ping)

    this.router.register(app)
  }

  public ping(_req: Request, res: Response) {
    res.send({
      ping: this.container.ping.getPingResponse(),
    })
  }
}
