import { IPoll } from "@/interfaces/poll";
import { Context } from "@/services";
import { Params, TypedRequest, TypedResponse } from "@/types/express";
import { Controller } from "@/utils/controller";
import { Router } from "express";

export class PollsController extends Controller<Context> {
  public base = "/polls"

  route(router: Router) {
    router.get("/", this.getUserPolls)
  }

  // user endpoints
  public async getUserPolls(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoll[]>) {
    throw new Error("unimplemented")
  }
}
