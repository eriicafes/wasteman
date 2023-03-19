import { ValidationError } from "@/errors/ValidationError"
import { TypedNextFn, TypedRequest, TypedResponse } from "@/types"
import { Controller } from "@/utils/controller"
import { isHttpProblem, NotFound } from "@curveball/http-errors"
import { Application } from "express"

export class ErrorHandlerController extends Controller {
  route(app: Application) {
    // not found route
    app.use((_req: TypedRequest, _res: TypedResponse, next: TypedNextFn) => {
      next(new NotFound())
    })

    // error route
    app.use((err: any, _req: TypedRequest, res: TypedResponse, _next: TypedNextFn) => {
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

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      })
    })
  }
}
