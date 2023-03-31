import { IModerator } from "./interfaces/moderator"
import { IUser } from "./interfaces/user"

declare global {
  namespace Express {
    export interface Request {
      user: IUser | undefined
      moderator: IModerator | undefined
    }
  }
}
