import { app } from "./app"
import { Container } from "./services"

async function run() {
  const container = Container.getInstance()
  const port = container.config.env.PORT

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

run()
