import { PingController } from "@/controllers/ping"
import { register } from "@/utils/controller"
import express from "express"

export const app = express()

// apply middlewares
app.use(express.json())

// register controllers
register(app).with(PingController)
