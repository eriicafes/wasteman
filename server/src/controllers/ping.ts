import { Controller } from "@/utils/controller"
import { Application, Request, Response, Router } from "express"

export class PingController extends Controller {
  route(app: Application, router: Router) {
    router.get("/", this.ping.bind(this))

    app.use("/ping", router)
  }

  public ping(_req: Request, res: Response) {
    res.send({
      ping: this.container.ping.getPingResponse(),
    })
  }
}
