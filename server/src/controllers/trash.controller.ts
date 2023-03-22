import Trash from "@/models/trashPoll"
import { Controller } from "@/utils/controller"
import { Application, Request, Response } from "express"

export class TrashController extends Controller {
  route(app: Application) {
    this.router.get("/", this.getAllTrashPolls)

    this.router.register(app, "/trash")
  }
  
  public getAllTrashPolls(req: Request, res: Response) {
    let trash = Trash.find((err: any, trash: any) => {
      if (err) {
        res.send("error")
      } else {
        res.status(200).json(trash);
      }
    })
  }
}

export let getAllTrashPolls = (req: Request, res: Response) => {
  let trash = Trash.find((err: any, trash: any) => {
    if (err) {
      res.send("error")
    } else {
      res.status(200).json(trash);
    }
  })
}

export let getATrashPoll = (req: Request, res: Response) => {
  let trash = Trash.findById(req.params.id, (err: any, trash: any) => {
    if (err) {
      res.send(err)
    } else {
      res.send(trash)
    }
  })
}

export let deleteTrashPoll = (req: Request, res: Response) => {
  let trash = Trash.deleteOne(
    {
      _id: req.params.id,
    },
    (err: any) => {
      if (err) {
        res.send(err)
      } else {
        res.send("Sucessfully deleted Trash Polls")
      }
    }
  )
}

export let updateTrashPoll = (req: Request, res: Response) => {
  console.log(req.body)
  let trash = Trash.findByIdAndUpdate(req.params.id, req.body, (err: any, trash: any) => {
    if (err) {
      res.send(err)
    } else {
      res.send("Sucessfully Updated Trash Polls")
    }
  })
}

export let addTrashPoll = async (req: Request, res: Response) => {
  const createData = await Trash.create({
    name: req.body.name,
    password: req.body.password,
    location: req.body.location,
    authType: req.body.authType,
    poll: req.body.poll,
  })
  console.log(req.body)
  res.status(201).json(createData)
}
