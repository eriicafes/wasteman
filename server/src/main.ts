import { Container } from "@/services"
import { app } from "./app"

async function run() {
  const container = Container.getInstance()
  const port = container.config.get("PORT")

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

run()
