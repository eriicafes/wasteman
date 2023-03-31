import { IUser } from "@/interfaces/user"
import { Poll } from "@/models/Poll"
import { BadRequest, NotFound } from "@curveball/http-errors"
import { Types } from "mongoose"
import { PointService } from "./point"

export class PollService {
  constructor(protected pointService: PointService) {}

  public async findAllForUser(userId: string) {
    const polls = await Poll.find({ "voters.userId": new Types.ObjectId(userId) }).sort("-createdAt")

    return polls
  }

  public async findAllForPoint(pointId: string) {
    const polls = await Poll.find({ pointId: new Types.ObjectId(pointId) }).sort("-createdAt")

    return polls
  }

  public async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null

    const poll = await Poll.findById(id)
    if (!poll) return null

    return poll
  }

  public async getOpenPoll(pointId: string) {
    const point = await this.pointService.findById(pointId)
    if (!point) throw new NotFound("Point not found")

    const poll = await Poll.findOne({ pointId: point._id, closed: false })
    if (!poll) throw new NotFound("All polls have been closed")

    return poll
  }

  public async vote(pointId: string, user: IUser) {
    const point = await this.pointService.findById(pointId)
    if (!point) throw new NotFound("Point not found")

    // check if user is an approved member
    const member = point.members.find((member) => member.userId.toString() === user.id)
    if (!member) throw new BadRequest("Vote restricted to members only")
    if (!member.approved) throw new BadRequest("Vote restricted to approved members only")

    // find an open poll for this point
    const poll = await Poll.findOne({ pointId, closed: false })
    if (poll) {
      // check if user has already voted
      const voteExists = poll.voters.some((voter) => voter.userId.toString() === user.id)
      if (voteExists) throw new BadRequest("Already voted for poll")

      // create and save user vote
      const voter = poll.voters.create({
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
      poll.voters.unshift(voter)
      await poll.save()

      return poll
    }

    // create new open poll for this point
    const newPoll = new Poll({
      pointId,
      voters: [
        {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      ],
    })
    await newPoll.save()

    return newPoll
  }

  public async unvote(pointId: string, userId: string) {
    // find and remove user vote from voters subdocument
    const poll = await Poll.findOneAndUpdate(
      {
        pointId: new Types.ObjectId(pointId),
        "voters.userId": new Types.ObjectId(userId),
        closed: false,
      },
      {
        $pull: {
          voters: { userId: new Types.ObjectId(userId) },
        },
      },
      { new: true }
    )

    if (!poll) throw new BadRequest("Vote not found for poll")

    return poll
  }

  public async close(pointId: string) {
    if (!Types.ObjectId.isValid(pointId)) return null

    const poll = await Poll.findOneAndUpdate(
      { pointId: new Types.ObjectId(pointId), closed: false },
      { closed: true },
      { new: true }
    )
    if (!poll) return null

    return poll
  }
}
