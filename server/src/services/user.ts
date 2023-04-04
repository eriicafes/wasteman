import { IUserDoc, User } from "@/models/User"
import { PickModel } from "@/types/mongoose"
import { Conflict } from "@curveball/http-errors"
import { Types } from "mongoose"

export class UserService {
  public async create(data: PickModel<IUserDoc>) {
    const user = await User.create(data).catch((err) => {
      if (err.code === 11000) {
        throw new Conflict("Account already exists")
      }
      throw err
    })

    return user
  }

  public async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null

    const user = await User.findById(id)
    if (!user) return null

    return user
  }

  public async findByEmail(email: string) {
    const user = await User.findOne({ email })
    if (!user) return null

    return user
  }
}
