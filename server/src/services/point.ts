import { IPoint } from "@/interfaces/point"
import { IUser } from "@/interfaces/user"
import { Point } from "@/models/Point"
import { PickModel } from "@/types/mongoose"
import { BadRequest } from "@curveball/http-errors"
import { Types } from "mongoose"

export class PointService {
  public async create(data: PickModel<IPoint>) {
    const point = await Point.create(data)

    return point
  }

  public async findAll(data: { lat: number; long: number; distance: number }) {
    const points = await Point.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [data.long, data.lat],
          },
          $maxDistance: data.distance,
        },
      },
    })

    return points
  }

  public async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null

    const point = await Point.findById(id)
    if (!point) return null

    return point
  }

  public async update(id: string, data: Pick<IPoint, "name" | "location" | "openTime" | "closeTime">) {
    if (!Types.ObjectId.isValid(id)) return null

    const point = await Point.findByIdAndUpdate(id, data, { new: true })

    return point
  }

  public async addUnapprovedMember(id: string, user: IUser) {
    // add user to members subdocument
    const point = await this.findById(id)
    if (!point) throw new BadRequest("Point not found")

    const memberExists = point.members.some((member) => member.userId.toString() === user.id)
    if (memberExists) throw new BadRequest("Memeber already exists")

    const voter = point.members.create({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      approved: false,
    })
    point.members.unshift(voter)
    await point.save()

    return point
  }

  public async approveMember(id: string, userId: string) {
    // find and update user from members subdocument
    const point = await Point.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        "members.userId": new Types.ObjectId(userId),
      },
      {
        $set: {
          "members.$.approved": true,
        },
      },
      { new: true }
    )

    if (!point) throw new BadRequest("Member not found for point")

    return point
  }

  public async removeMember(id: string, userId: string) {
    // find and remove user from members subdocument
    const point = await Point.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        "members.userId": new Types.ObjectId(userId),
      },
      {
        $pull: {
          members: { userId: new Types.ObjectId(userId) },
        },
      },
      { new: true }
    )

    if (!point) throw new BadRequest("Member not found for point")

    return point
  }

  public async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) return null

    const point = await Point.findByIdAndRemove(id)

    return point
  }
}
