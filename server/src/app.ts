import express, { Request, Response } from "express"
import { ErrorHandlerController } from "./controllers/error-handler"
import { PingController } from "./controllers/ping"
import { register } from "./utils/controller"
import { connectDB } from "./db/db"

export const app = express()

// apply middlewares
app.use(express.json())

connectDB();

// API Test
app.get("/", ((req: Request, res: Response) => res.send("hi")))

// register controllers
register(app).with(
  PingController,
  ErrorHandlerController // needs to be the last
)
