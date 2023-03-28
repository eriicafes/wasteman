import express from "express"
import { AuthController } from "./controllers/auth"
import { ErrorHandlerController } from "./controllers/error-handler"
import { PingController } from "./controllers/ping"
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
    ErrorHandlerController // needs to be the last
  )

  return app
}
