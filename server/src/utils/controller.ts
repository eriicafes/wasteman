import { Application, RequestHandler, Router } from "express"

/**
 * Base controller with injected context and router.
 *
 * All sub-controllers that extends this controller will have access to the shared context
 * and must implement the `route(app)` method to register itself to the application.
 */
export abstract class Controller<T> {
  constructor(protected ctx: T, private _router: Router) {}

  /**
   * Register controller to the application. It is intended that this method calls `this.router.register(app, path)`.
   * @param app Express application.
   */
  abstract route(app: Application): void

  /**
   * router methods binds the `this` keyword to the controller instance.
   */
  protected router = {
    use: (...handlers: RequestHandler[]) => void this._router.use(...handlers.map((h) => asyncHandler(h.bind(this)))),
    get: (path: string, ...handlers: RequestHandler[]) =>
      void this._router.get(path, ...handlers.map((h) => asyncHandler(h.bind(this)))),
    post: (path: string, ...handlers: RequestHandler[]) =>
      void this._router.post(path, ...handlers.map((h) => asyncHandler(h.bind(this)))),
    put: (path: string, ...handlers: RequestHandler[]) =>
      void this._router.put(path, ...handlers.map((h) => asyncHandler(h.bind(this)))),
    patch: (path: string, ...handlers: RequestHandler[]) =>
      void this._router.patch(path, ...handlers.map((h) => asyncHandler(h.bind(this)))),
    delete: (path: string, ...handlers: RequestHandler[]) =>
      void this._router.delete(path, ...handlers.map((h) => asyncHandler(h.bind(this)))),
    register: (app: Application, path?: string) => void (path ? app.use(path, this._router) : app.use(this._router)),
  }
}

/**
 * Wrap async handler function to catch and prevent errors from exiting the nodejs process.
 */
const asyncHandler = (handler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await Promise.resolve(handler(req, res, next))
    } catch (err) {
      next(err)
    }
  }
}

type ControllerConstructor<T> = new (...args: ConstructorParameters<typeof Controller<T>>) => Controller<T>

/**
 * Register multiple controllers to the application.
 * @param app Express application.
 * @param context Shared application context.
 */
export function register<T>(app: Application, context: T) {
  return {
    with(...controllers: ControllerConstructor<T>[]) {
      for (const Controller of controllers) {
        const controller = new Controller(context, Router())
        controller.route(app)
      }
    },
  }
}
