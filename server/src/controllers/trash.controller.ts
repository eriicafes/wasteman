import Trash from "@/models/trashPoll"
import { Controller } from "@/utils/controller"
import { Application, Request, Response } from "express"

export class TrashController extends Controller {
  route(app: Application) {
    this.router.get("/", this.getAllTrashPolls)
    this.router.get("/:trashId", this.getAllTrashPolls)

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

export let getAllTrashPolls = async(req: Request, res: Response) => {
  const trash = await Trash.find()
  res.status(200).json(trash);
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

export let deleteTrashPoll = async(req: Request, res: Response) => {
  const trash = await Trash.findById(req.params.id)
    if(!trash) {
        res.status(400);
        throw new Error('Data not Found')
    }
    await trash.deleteOne();
    res.status(200).json({ message: `Deleted Data ${req.params.id}` })
}

export let updateTrashPoll = async(req: Request, res: Response) => {
  const trash = await Trash.findById(req.params.id)
  if(!trash) {
      res.status(400)
      throw new Error('Data not Found');
  }
  const updatedData = await Trash.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
  })
  res.status(200).json(updatedData);
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
