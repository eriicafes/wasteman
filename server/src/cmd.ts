import { Command } from "commander"
import { ModeratorsCmd } from "./commands/moderators"
import { connectDB } from "./lib/db"
import { Context } from "./services"
import { register } from "./utils/command"

async function run() {
  const ctx = Context.getInstance()

  connectDB(ctx.config.env.MONGO_URI)

  const command = new Command()

  register("Wasteman CLI", command, ctx).with(ModeratorsCmd)

  await command.parseAsync()
  process.exit()
}

run()
