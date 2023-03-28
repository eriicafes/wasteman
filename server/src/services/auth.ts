import { Conflict, InternalServerError, Unauthorized } from "@curveball/http-errors"
import { JwtService } from "./jwt"
import { UserService } from "./user"

export class AuthService {
  constructor(protected userService: UserService, protected jwtService: JwtService) {}

  public async createWithPassword(email: string, password: string, data: UserPasswordCreateData) {
    const user = await this.userService
      .create({
        auth: "password",
        email,
        password,
        ...data,
      })
      .catch((err) => {
        if (err.code === 11000) {
          throw new Conflict("Account already exists")
        }
        throw err
      })

    // sign jwt token with the email, auth type and hashed password
    const token = await this.jwtService.sign(user.email, "password", user.password!)

    return { user, token }
  }

  public async authenticateWithPassword(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    // check if user exists
    if (!user) throw new Unauthorized("Invalid email address or password")

    // compare password
    const match = await user.comparePassword(password)
    if (!match) throw new Unauthorized("Invalid email address or password")

    // user must have an auth type of "password" and their password must not be an empty string
    if (!user || user.auth !== "password" || !user.password) {
      throw new Unauthorized("Invalid email address or password")
    }

    // sign jwt token with the email, auth type and hashed password
    const token = await this.jwtService.sign(user.email, "password", user.password)

    return { user, token }
  }

  public async verifyToken(token: string) {
    // get email, auth type and hashed password from jwt token
    const { email, auth, key } = await this.jwtService.verify(token)

    const user = await this.userService.findByEmail(email)

    // check if user exists
    if (!user) throw new Unauthorized("Invalid token")

    // TODO: verify with google auth
    if (auth === "google") {
      throw new InternalServerError("Google auth unimplemented")
    }

    // verify with password auth
    // compare password hash, this ensures the password has not changed since the last time this jwt token was issued
    if (user.password !== key) throw new Unauthorized("Invalid token")

    return { user }
  }
}

type UserPasswordCreateData = {
  firstName: string
  lastName: string
}
