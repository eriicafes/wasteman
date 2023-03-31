import { ModeratorResource } from "@/models/Moderator"
import { Context } from "@/services"
import { Cmd, OptionalArg, parse, prompt } from "@/utils/command"
import chalk from "chalk"
import Table from "cli-table"
import { Command } from "commander"
import { z } from "zod"

const actions = ["list", "create", "delete"] as const
type Action = (typeof actions)[number]

export class ModeratorsCmd extends Cmd<Context> {
  public cmd = "moderators [action]"

  protected setup(command: Command) {
    return command.description("manage moderators")
  }

  protected async action(action: OptionalArg) {
    const answers = await prompt<{ action: Action }>(
      [
        {
          name: "action",
          message: "What action would you like to perform?",
          type: "list",
          choices: actions,
          when() {
            return !actions.includes(action as Action)
          },
        },
      ],
      {
        action: actions.includes(action as Action) ? (action as Action) : undefined,
      }
    )

    const actionFns = {
      // list all moderators
      list: async () => {
        const moderators = await this.ctx.moderator.findAll()

        const table = new Table({
          head: ["id", "email", "firstName", "lastName", "createdAt"].map((t) => chalk.cyanBright(t)),
          rows: moderators
            .map(ModeratorResource.json)
            .map((moderator) => [
              chalk.gray(moderator.id),
              moderator.email,
              moderator.firstName,
              moderator.lastName,
              new Date(moderator.createdAt).toDateString(),
            ]),
        })
        console.log(table.toString())
      },

      // create new moderator
      create: async () => {
        const answers = await prompt([
          {
            name: "email",
            message: "Enter email address",
          },
          {
            name: "firstName",
            message: "Enter first name",
          },
          {
            name: "lastName",
            message: "Enter last name",
          },
          {
            name: "password",
            message: "Enter password",
            type: "password",
            mask: "*",
          },
          {
            name: "confirmPassword",
            message: "Confirm password",
            type: "password",
            mask: "*",
            validate(input, answers) {
              return input === answers?.password || "Passwords do not match"
            },
          },
        ])

        const validated = await parse(
          answers,
          z.object({
            email: z.string().email(),
            firstName: z.string(),
            lastName: z.string(),
            password: z.string(),
          })
        )

        const moderator = ModeratorResource.json(await this.ctx.moderator.create(validated))

        const table = new Table({
          head: ["id", "email", "firstName", "lastName", "createdAt"].map((t) => chalk.green(t)),
          rows: [
            [
              chalk.gray(moderator.id),
              moderator.email,
              moderator.firstName,
              moderator.lastName,
              new Date(moderator.createdAt).toDateString(),
            ],
          ],
        })
        console.log(table.toString())
        console.log(chalk.green("Moderator created successfully"))
      },

      // delete existing moderator
      delete: async () => {
        const answers = await prompt<{ email: string }>([
          {
            name: "email",
            message: "Enter email address",
          },
        ])

        const moderator = await this.ctx.moderator.findByEmail(answers.email)
        if (!moderator) return console.log(chalk.red("Moderator not found"))

        const moderatorDisplay = ModeratorResource.json(moderator)
        await moderator.deleteOne()

        const table = new Table({
          head: ["id", "email", "firstName", "lastName", "createdAt"],
          rows: [
            [
              chalk.gray(moderator.id),
              moderatorDisplay.email,
              moderatorDisplay.firstName,
              moderatorDisplay.lastName,
              new Date(moderatorDisplay.createdAt).toDateString(),
            ],
          ],
        })
        console.log(table.toString())
        console.log(chalk.green("Moderator deleted successfully"))
      },
    } satisfies Record<Action, () => Promise<void>>

    await actionFns[answers.action]()
  }
}
