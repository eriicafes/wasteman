import { Controller } from "@/utils/controller"
import { Application, NextFunction, Request, Response } from "express"

export class ErrorHandlerController extends Controller {
  route(app: Application) {
    // not found route
    app.use((req, res, next) => {
      res.json({
        error: "Not found",
      })
    })

    // error route
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.json({
        error: "Something went wrong",
      })
    })
  }
}
