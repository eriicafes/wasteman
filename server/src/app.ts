import express from "express"
import { ErrorHandlerController } from "./controllers/error-handler"
import { PingController } from "./controllers/ping"
import { register } from "./utils/controller"

export const app = express()

// apply middlewares
app.use(express.json())

// register controllers
register(app).with(
  PingController,
  ErrorHandlerController // needs to be the last
)
