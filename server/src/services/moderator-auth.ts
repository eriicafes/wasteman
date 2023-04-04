import { Unauthorized } from "@curveball/http-errors"
import { JwtService } from "./jwt"
import { ModeratorService } from "./moderator"

export class ModeratorAuthService {
  constructor(protected moderatorService: ModeratorService, protected jwtService: JwtService) {}

  public async create(email: string, password: string, data: ModeratorPasswordCreateData) {
    const moderator = await this.moderatorService.create({
      email,
      password,
      ...data,
    })

    return { moderator }
  }

  public async authenticate(email: string, password: string) {
    const moderator = await this.moderatorService.findByEmail(email)

    // check if moderator exists
    if (!moderator) throw new Unauthorized("Invalid email address or password")

    // compare password
    const match = await moderator.comparePassword(password)
    if (!match) throw new Unauthorized("Invalid email address or password")

    // sign jwt token with the email and hashed password
    const token = await this.jwtService.sign(moderator.email, "password", moderator.password)

    return { moderator, token }
  }

  public async verifyToken(token: string) {
    // get email and hashed password from jwt token
    const { email, key } = await this.jwtService.verify(token)

    const moderator = await this.moderatorService.findByEmail(email)

    // check if moderator exists
    if (!moderator) throw new Unauthorized("Invalid token")

    // compare password hash, this ensures the password has not changed since the last time this jwt token was issued
    if (moderator.password !== key) throw new Unauthorized("Invalid token")

    return { moderator }
  }
}

type ModeratorPasswordCreateData = {
  firstName: string
  lastName: string
}
