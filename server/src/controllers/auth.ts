import { Request, Response } from "express"
import UserModel from "@/models/auth"

export let register = async (req: Request, res: Response) => {
  const createData = await UserModel.create({
    email: req.body.email,
    password: req.body.password,
    authType: req.body.authType,
    googleAuth: req.body.googleAuth
  })
  console.log(req.body)
  res.status(201).json(createData)
}

export let login = async (req: Request, res: Response) => {
  const foundUser = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password,
  })
}