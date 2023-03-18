import { Container } from "@/services"
import { Application, Router } from "express"

type ControllerConstructor = new (container: Container) => Controller

/**
 * Base controller with injected service container.
 *
 * All sub-controllers that extends this controller will have access to the shared service container
 * and must implement the `route(app, router)` method to register itself to the application.
 */
export abstract class Controller {
  constructor(protected container: Container) {}

  /**
   * Register controller to the application. It is intended that this method calls `app.use(router)`.
   * @param app Express application.
   * @param router A new express router instantiated for this controller.
   */
  abstract route(app: Application, router: Router): void
}

/**
 * Register multiple controllers to the application.
 * @param app Express application.
 */
export function register(app: Application) {
  return {
    with(...controllers: ControllerConstructor[]) {
      for (const Controller of controllers) {
        const container = Container.getInstance()
        const controller = new Controller(container)

        const router = Router()
        controller.route(app, router)
      }
    },
  }
}
