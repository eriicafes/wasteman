import { ValidationError } from "@/errors/ValidationError"
import { Context } from "@/services"
import { TypedNextFn, TypedRequest, TypedResponse } from "@/types/express"
import { Controller } from "@/utils/controller"
import { isHttpProblem, NotFound } from "@curveball/http-errors"
import { Application } from "express"

export class ErrorHandlerController extends Controller<Context> {
  route() {}

  configure(app: Application) {
    // not found route
    app.use((_req: TypedRequest, _res: TypedResponse<void>, next: TypedNextFn) => {
      next(new NotFound())
    })

    // error route
    app.use((err: any, _req: TypedRequest, res: TypedResponse<void>, _next: TypedNextFn) => {
      if (err instanceof ValidationError) {
        return res.status(err.httpStatus).json({
          success: false,
          message: err.detail ?? err.title,
          errors: err.errors,
        })
      }

      if (isHttpProblem(err)) {
        return res.status(err.httpStatus).json({
          success: false,
          message: err.detail ?? err.title,
        })
      }

      // log unknown errors in development mode
      if (this.ctx.config.env.NODE_ENV === "development") {
        console.log(err)
      }

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      })
    })
  }
}
