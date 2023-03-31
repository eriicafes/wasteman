import express from "express"
import { AuthController } from "./controllers/auth"
import { ErrorHandlerController } from "./controllers/error-handler"
import { ModeratorsController } from "./controllers/moderators"
import { PingController } from "./controllers/ping"
import { PointsController } from "./controllers/points"
import { PollsController } from "./controllers/polls"
import { Context } from "./services"
import { register } from "./utils/controller"

export function bootstrap(ctx: Context) {
  const app = express()

  // apply middlewares
  app.use(express.json())

  // register controllers
  register(app, ctx).with(
    PingController,
    AuthController,
    ModeratorsController,
    PointsController,
    PollsController,
    ErrorHandlerController // needs to be the last
  )

  return app
}
