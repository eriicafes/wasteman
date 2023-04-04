import { IModeratorDoc, Moderator } from "@/models/Moderator"
import { PickModel } from "@/types/mongoose"
import { Conflict } from "@curveball/http-errors"
import { Types } from "mongoose"

export class ModeratorService {
  public async create(data: PickModel<IModeratorDoc>) {
    const moderator = await Moderator.create(data).catch((err) => {
      if (err.code === 11000) {
        throw new Conflict("Moderator already exists")
      }
      throw err
    })

    return moderator
  }

  public async findAll() {
    const moderators = await Moderator.find().sort("-createdAt")

    return moderators
  }

  public async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null

    const moderator = await Moderator.findById(id)
    if (!moderator) return null

    return moderator
  }

  public async findByEmail(email: string) {
    const moderator = await Moderator.findOne({ email })
    if (!moderator) return null

    return moderator
  }
}
