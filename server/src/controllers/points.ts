import { IPoint } from "@/interfaces/point"
import { IPoll } from "@/interfaces/poll"
import { authenticate } from "@/middlewares/authenticate"
import { PointResource } from "@/models/Point"
import { PollResource } from "@/models/Poll"
import { getAuth } from "@/pipes/auth"
import { validate } from "@/pipes/validate"
import { Context } from "@/services"
import { Params, TypedRequest, TypedResponse } from "@/types/express"
import { Controller } from "@/utils/controller"
import { Router } from "express"
import { z } from "zod"

export class PointsController extends Controller<Context> {
  public base = "/points"

  route(router: Router) {
    router.get("/", authenticate(this.ctx, "all"), this.getPoints)
    router.get("/:id", authenticate(this.ctx, "all"), this.getPoint)

    router.post("/", authenticate(this.ctx, "moderator"), this.createPoint)
    router.put("/:id", authenticate(this.ctx, "moderator"), this.updatePoint)
    router.delete("/:id", authenticate(this.ctx, "moderator"), this.deletePoint)

    router.get("/:id/poll", authenticate(this.ctx, "all"), this.getOpenPoll)
    router.get("/:id/polls", authenticate(this.ctx, "all"), this.getPointPolls)
    router.post("/:id/vote", authenticate(this.ctx, "user"), this.votePoint)
    router.delete("/:id/vote", authenticate(this.ctx, "user"), this.unvotePoint)
    router.post("/:id/vote/close", authenticate(this.ctx, "moderator"), this.closeVotePoint)

    router.post("/:id/membership", authenticate(this.ctx, "user"), this.requestMembership)
    router.delete("/:id/membership", authenticate(this.ctx, "user"), this.cancelMembership)
    router.post("/:id/membership/:userId", authenticate(this.ctx, "moderator"), this.approveMembership)
    router.delete("/:id/membership/:userId", authenticate(this.ctx, "moderator"), this.revokeMembership)
  }

  public async getPoints(req: TypedRequest, res: TypedResponse<IPoint[]>) {
    const query = await validate(req, PointsSchema.points, "query")

    const points = await this.ctx.point.findAll(query)

    res.json({
      success: true,
      message: "OK",
      data: points.map(PointResource.json),
    })
  }

  public async getPoint(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoint>) {
    const point = await this.ctx.point.findById(req.params.id)

    if (!point) {
      return res.status(404).json({
        success: false,
        message: "Point not found",
      })
    }

    res.json({
      success: true,
      message: "OK",
      data: PointResource.json(point),
    })
  }

  public async createPoint(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoint>) {
    const data = await validate(req, PointsSchema.create)

    const point = await this.ctx.point.create({
      name: data.name,
      location: {
        type: "Point",
        coordinates: [data.long, data.lat],
      },
      members: [],
      openTime: data.openTime,
      closeTime: data.closeTime,
    })

    res.json({
      success: true,
      message: "Point created successfully",
      data: PointResource.json(point),
    })
  }

  public async updatePoint(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoint>) {
    const data = await validate(req, PointsSchema.update)

    const point = await this.ctx.point.update(req.params.id, {
      name: data.name,
      location: {
        type: "Point",
        coordinates: [data.long, data.lat],
      },
      openTime: data.openTime,
      closeTime: data.closeTime,
    })

    if (!point) {
      return res.status(404).json({
        success: false,
        message: "Point not found",
      })
    }

    res.json({
      success: true,
      message: "Point created successfully",
      data: PointResource.json(point),
    })
  }

  public async deletePoint(req: TypedRequest<Params<"id">>, res: TypedResponse<null>) {
    const point = await this.ctx.point.remove(req.params.id)

    if (!point) {
      return res.status(404).json({
        success: false,
        message: "Point not found",
      })
    }

    res.json({
      success: true,
      message: "Point removed successfully",
      data: null,
    })
  }

  public async getOpenPoll(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoll>) {
    const poll = await this.ctx.poll.getOpenPoll(req.params.id)

    res.json({
      success: true,
      message: "OK",
      data: PollResource.json(poll),
    })
  }

  public async getPointPolls(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoll[]>) {
    const polls = await this.ctx.poll.findAllForPoint(req.params.id)

    res.json({
      success: true,
      message: "OK",
      data: polls.map(PollResource.json),
    })
  }

  public async votePoint(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoll>) {
    const user = getAuth(req, "user")

    const poll = await this.ctx.poll.vote(req.params.id, user)

    res.json({
      success: true,
      message: "Vote added successfully",
      data: PollResource.json(poll),
    })
  }

  public async unvotePoint(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoll>) {
    const user = getAuth(req, "user")

    const poll = await this.ctx.poll.unvote(req.params.id, user.id)

    res.json({
      success: true,
      message: "Vote removed successfully",
      data: PollResource.json(poll),
    })
  }

  public async closeVotePoint(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoll>) {
    const poll = await this.ctx.poll.close(req.params.id)

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Point not found",
      })
    }

    res.json({
      success: true,
      message: "Poll closed successfully",
      data: PollResource.json(poll),
    })
  }

  public async requestMembership(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoint>) {
    const user = getAuth(req, "user")

    const point = await this.ctx.point.addUnapprovedMember(req.params.id, user)

    res.json({
      success: true,
      message: "Membership request sent successfully",
      data: PointResource.json(point),
    })
  }

  public async cancelMembership(req: TypedRequest<Params<"id">>, res: TypedResponse<IPoint>) {
    const user = getAuth(req, "user")

    const point = await this.ctx.point.removeMember(req.params.id, user.id)

    res.json({
      success: true,
      message: "Membership cancelled successfully",
      data: PointResource.json(point),
    })
  }

  public async approveMembership(req: TypedRequest<Params<"id" | "userId">>, res: TypedResponse<IPoint>) {
    const point = await this.ctx.point.approveMember(req.params.id, req.params.userId)

    res.json({
      success: true,
      message: "Membership approved successfully",
      data: PointResource.json(point),
    })
  }

  public async revokeMembership(req: TypedRequest<Params<"id" | "userId">>, res: TypedResponse<IPoint>) {
    const point = await this.ctx.point.removeMember(req.params.id, req.params.userId)

    res.json({
      success: true,
      message: "Membership removed successfully",
      data: PointResource.json(point),
    })
  }
}

class PointsSchema {
  public static points = z.object({
    lat: z.string().transform((val) => parseFloat(val)),
    long: z.string().transform((val) => parseFloat(val)),
    distance: z.string().transform((val) => parseFloat(val)),
  })

  public static create = z.object({
    name: z.string(),
    lat: z.number(),
    long: z.number(),
    openTime: z.string(),
    closeTime: z.string(),
  })

  public static update = z.object({
    name: z.string(),
    lat: z.number(),
    long: z.number(),
    openTime: z.string(),
    closeTime: z.string(),
  })
}
