import { IPoint } from "@/interfaces/garbage-point";
import { IPoll } from "@/interfaces/poll";
import { IVote } from "@/interfaces/vote";
import { Context } from "@/services";
import { Params, TypedRequest, TypedResponse } from "@/types/express";
import { Controller } from "@/utils/controller";
import { Router } from "express";

export class PointsController extends Controller<Context> {
  public base = "/points"

  route(router: Router) {
    router.get("/:lat/:long/:distance", this.getPoints)

    router.get("/:id", this.getPoint)
    router.get("/:id/polls", this.getPointPolls)

    router.post("/:id/vote", this.votePoint)
    router.delete("/:id/vote", this.unvotePoint)
  }

  // user endpoints
  public async getPoints(req: TypedRequest<Params<"lat" | "long" | "distance">>, res: TypedResponse<IPoint[]>) {
    console.log(req.params.lat, req.params.long, req.params.distance)
    throw new Error("unimplemented")
  }

  public async getPoint(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoint>) {
    throw new Error("unimplemented")
  }

  public async getPointPolls(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoll[]>) {
    throw new Error("unimplemented")
  }

  public async votePoint(req: TypedRequest<Params<"id">>, res: TypedResponse<IVote>) {
    throw new Error("unimplemented")
  }

  public async unvotePoint(req: TypedRequest<Params<"id">>, res: TypedResponse<IVote>) {
    throw new Error("unimplemented")
  }
}
