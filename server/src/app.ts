import express, { Request, Response } from "express"
import { connectDB } from "./config/db"
import { ErrorHandlerController } from "./controllers/error-handler"
import { PingController } from "./controllers/ping"
import {
  addTrashPoll,
  deleteTrashPoll,
  getAllTrashPolls,
  getATrashPoll,
  TrashController,
  updateTrashPoll
} from "./controllers/trash.controller"
import { register } from "./utils/controller"

export const app = express()

// apply middlewares
app.use(express.json())

connectDB();

app.use(express.urlencoded({ extended: false }));

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
  TrashController,
  ErrorHandlerController // needs to be the last
)
