import { PingController } from "@/controllers/ping"
import { register } from "@/utils/controller"
import express from "express"
import { ErrorHandlerController } from "./controllers/error-handler"

export const app = express()

// apply middlewares
app.use(express.json())

// register controllers
register(app).with(
  PingController,
  // needs to be the last
  ErrorHandlerController
)
