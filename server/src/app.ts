import express, { Request, Response } from "express"
import { ErrorHandlerController } from "./controllers/error-handler"
import { PingController } from "./controllers/ping"
import { register } from "./utils/controller"
import { connectDB } from "./config/db"
import {
  addTrashPoll,
  deleteTrashPoll,
  getAllTrashPolls,
  getATrashPoll,
  updateTrashPoll,
} from "./controllers/trash.controller"

export const app = express()

// apply middlewares
app.use(express.json())

connectDB()

// API Test
app.get("/", (req: Request, res: Response) => res.send("hi"))

// API Endpoints
app.get("/trashs", getAllTrashPolls)
app.get("/trash/:id", getATrashPoll)
app.post("/trash", addTrashPoll)
app.put("/trash/:id", updateTrashPoll)
app.delete("/trash/:id", deleteTrashPoll)

// register controllers
register(app).with(
  PingController,
  ErrorHandlerController // needs to be the last
)
