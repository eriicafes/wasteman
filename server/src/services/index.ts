import { AuthService } from "./auth"
import { ConfigService } from "./config"
import { JwtService } from "./jwt"
import { PingService } from "./ping"
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

  private constructor() {
    this.config = new ConfigService()
    this.jwt = new JwtService(this.config)
    this.ping = new PingService()
    this.user = new UserService()
    this.auth = new AuthService(this.user, this.jwt)
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
