import { AuthService } from "./auth"
import { ConfigService } from "./config"
import { JwtService } from "./jwt"
import { ModeratorService } from "./moderator"
import { ModeratorAuthService } from "./moderator-auth"
import { PingService } from "./ping"
import { PointService } from "./point"
import { PollService } from "./poll"
import { UserService } from "./user"

/**
 * Shared application context
 */
export class Context {
  public config: ConfigService
  public jwt: JwtService
  public ping: PingService
  public user: UserService
  public auth: AuthService
  public moderator: ModeratorService
  public moderatorAuth: ModeratorAuthService
  public point: PointService
  public poll: PollService

  private constructor() {
    this.config = new ConfigService()
    this.jwt = new JwtService(this.config)
    this.ping = new PingService()
    this.user = new UserService()
    this.auth = new AuthService(this.user, this.jwt)
    this.moderator = new ModeratorService()
    this.moderatorAuth = new ModeratorAuthService(this.moderator, this.jwt)
    this.point = new PointService()
    this.poll = new PollService(this.point)
  }

  private static instance: Context | undefined

  public static getInstance() {
    // return stored instance if available
    if (Context.instance) return Context.instance
    // otherwise instantiate and store new instance
    const instance = new Context()
    Context.instance = instance
    return instance
  }
}
