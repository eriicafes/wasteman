import { Request, Response } from "express";

export let getAllTrashPolls = (req: Request, res: Response) => {
  res.send("Return all Books")
};
export let getATrashPoll = (req: Request, res: Response) => {
  res.send("gets a trash poll")
};
export let deleteTrashPoll = (req: Request, res: Response) => {
  res.send("deletes a poll")
};
export let updateTrashPoll = (req: Request, res: Response) => {
  res.send("Updates a poll")
};
export let addTrashPoll = (req: Request, res: Response) => {
  res.send("Return a Poll")
};