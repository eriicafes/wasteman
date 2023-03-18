import { Container } from "@/services"
import { Application, RequestHandler, Router } from "express"

/**
 * Base controller with injected service container and router.
 *
 * All sub-controllers that extends this controller will have access to the shared service container
 * and must implement the `route(app)` method to register itself to the application.
 */
export abstract class Controller {
  constructor(protected container: Container, private _router: Router) {}

  /**
   * Register controller to the application. It is intended that this method calls `this.router.register(app, path)`.
   * @param app Express application.
   */
  abstract route(app: Application): void

  /**
   * router methods binds the `this` keyword to the controller instance.
   */
  protected router = {
    use: (...handlers: RequestHandler[]) => void this._router.use(...handlers.map((h) => h.bind(this))),
    get: (path: string, ...handlers: RequestHandler[]) =>
      void this._router.get(path, ...handlers.map((h) => h.bind(this))),
    post: (path: string, ...handlers: RequestHandler[]) =>
      void this._router.post(path, ...handlers.map((h) => h.bind(this))),
    put: (path: string, ...handlers: RequestHandler[]) =>
      void this._router.put(path, ...handlers.map((h) => h.bind(this))),
    patch: (path: string, ...handlers: RequestHandler[]) =>
      void this._router.patch(path, ...handlers.map((h) => h.bind(this))),
    delete: (path: string, ...handlers: RequestHandler[]) =>
      void this._router.delete(path, ...handlers.map((h) => h.bind(this))),
    register: (app: Application, path?: string) => void (path ? app.use(path, this._router) : app.use(this._router)),
  }
}

type ControllerConstructor = new (...args: ConstructorParameters<typeof Controller>) => Controller

/**
 * Register multiple controllers to the application.
 * @param app Express application.
 */
export function register(app: Application) {
  return {
    with(...controllers: ControllerConstructor[]) {
      for (const Controller of controllers) {
        const controller = new Controller(Container.getInstance(), Router())
        controller.route(app)
      }
    },
  }
}
