import { bootstrap } from "./app"
import { connectDB } from "./lib/db"
import { Context } from "./services"

async function run() {
  const ctx = Context.getInstance()
  const app = bootstrap(ctx)

  connectDB(ctx.config.env.MONGO_URI)

  const port = ctx.config.env.PORT

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

run()
