import { IPoint } from "@/interfaces/garbage-point";
import { ISite } from "@/interfaces/garbage-site";
import { IPoll } from "@/interfaces/poll";
import { Context } from "@/services";
import { Params, TypedRequest, TypedResponse } from "@/types/express";
import { Controller } from "@/utils/controller";
import { Router } from "express";

export class SitesController extends Controller<Context> {
  public base = "/sites"

  route(router: Router) {
    router.get("/:lat/:long/:distance", this.getSites)

    router.get("/:id", this.getSite)
    router.get("/:id/points", this.getSitePoints)
    router.get("/:id/polls", this.getSitePolls)

    router.post("/:id/membership", this.requestSiteMembership)
    router.delete("/:id/membership", this.cancelSiteMembership)
  }

  // user endpoints
  public async getSites(req: TypedRequest<Params<"lat" | "long" | "distance">>, res: TypedResponse<ISite[]>) {
    console.log(req.params.lat, req.params.long, req.params.distance)
    throw new Error("unimplemented")
  }

  public async getSite(req: TypedRequest<Params<"id">>, res: TypedResponse<ISite>) {
    throw new Error("unimplemented")
  }

  public async getSitePoints(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoint[]>) {
    throw new Error("unimplemented")
  }

  public async getSitePolls(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoll[]>) {
    throw new Error("unimplemented")
  }

  public async requestSiteMembership(req: TypedRequest<Params<"id">>, res: TypedResponse<void>) {
    throw new Error("unimplemented")
  }

  public async cancelSiteMembership(req: TypedRequest<Params<"id">>, res: TypedResponse<void>) {
    throw new Error("unimplemented")
  }
}
