import { ConfigService } from "./config"
import { PingService } from "./ping"

/**
 * Singleton service container
 */
export class Container {
  public config: ConfigService
  public ping: PingService

  private constructor() {
    this.config = new ConfigService()
    this.ping = new PingService()
  }

  private static instance: Container | undefined

  public static getInstance() {
    // return stored instance if available
    if (Container.instance) return Container.instance
    // otherwise instantiate and store new container instance
    const instance = new Container()
    Container.instance = instance
    return instance
  }
}
