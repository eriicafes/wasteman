import { AuthType } from "@/models/User"
import JWT from "jsonwebtoken"
import { ConfigService } from "./config"

export class JwtService {
  private static TOKEN_LIFETIME = "30d" // token will expire after 30 days

  constructor(protected config: ConfigService) {}

  public async sign(email: string, auth: AuthType, key: string) {
    const token = await this.internalSign({ jwtid: email, expiresIn: JwtService.TOKEN_LIFETIME }, { key, auth })
    return token
  }

  public async verify(token: string) {
    const { jti, key, auth } = await this.internalVerify(token)

    return {
      email: jti as string,
      key: key as string,
      auth: auth as AuthType,
    }
  }

  private internalSign(options: JWT.SignOptions, payload: Record<string, string> = {}): Promise<string> {
    return new Promise((resolve, reject) => {
      JWT.sign(payload, this.config.env.SECRET, options, (err, token) => {
        if (err || !token) {
          return reject(new Error("JWT sign error"))
        }
        resolve(token)
      })
    })
  }

  private internalVerify(token: string): Promise<JWT.JwtPayload> {
    return new Promise((resolve, reject) => {
      JWT.verify(token, this.config.env.SECRET, (err, payload) => {
        if (err || !payload) {
          return reject(new Error("JWT verify error"))
        }
        resolve(payload as JWT.JwtPayload)
      })
    })
  }
}
