import { Application, RequestHandler, Router } from "express"

/**
 * Base controller with injected context and router.
 *
 * All sub-controllers that extends this controller will have access to the shared context
 * and must implement the `route(router)` method to register it's routes to the application.
 */
export abstract class Controller<T> {
  constructor(protected ctx: T) { }

  /**
   * Controller base path.
   */
  public base: string | undefined = undefined

  /**
   * Register controller routes.
   * @param router Express router.
   */
  abstract route(router: Router): void

  /**
   * Configure application with controller.
   * @param app Express application.
   */
  configure(app: Application): void { }
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
        // instantiate controller
        const controller = new Controller(context)
        const router = Router()

        // bind controller methods
        for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(controller))) {
          if (key === "constructor" || key === "route" || key === "configure") continue

          const value = controller[key as keyof typeof controller]
          if (typeof value !== "function") continue

          controller[key as keyof typeof controller] = asyncHandler(value.bind(controller) as any) as any
        }

        // configure application with controller
        controller.configure.call(controller, app)
        // register routes
        controller.route(router)

        // bind router to application
        if (controller.base) app.use(controller.base, router)
        else app.use(router)
      }
    },
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
