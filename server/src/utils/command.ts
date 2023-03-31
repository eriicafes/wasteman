import { Command } from "commander"
import { Answers, createPromptModule, QuestionCollection } from "inquirer"
import { ZodType, ZodTypeDef } from "zod"

export type OptionalArg = string | undefined
export type RequiredArg = string

export abstract class Cmd<T> {
  constructor(protected command: Command, protected ctx: T) {}

  public abstract readonly cmd: string
  protected abstract setup(command: Command): Command
  protected abstract action(...args: any[]): Promise<void> | void

  public load() {
    const command = this.command.command(this.cmd)

    this.setup(command).action(this.action.bind(this))
  }
}

type CmdConstructor<T> = new (...args: ConstructorParameters<typeof Cmd<T>>) => Cmd<T>

export function register<T>(name: string, command: Command, context: T) {
  return {
    with(...commands: CmdConstructor<T>[]) {
      command.name(name)

      for (const Cmd of commands) {
        new Cmd(command, context).load()
      }
    },
  }
}

export async function prompt<T extends Answers>(
  questions: QuestionCollection,
  initialAnswers?: Partial<T>
): Promise<T> {
  const promptModule = createPromptModule()

  return promptModule<T>(questions, initialAnswers)
}

export async function parse<Input, Def extends ZodTypeDef = ZodTypeDef, Output = Input>(
  data: unknown,
  schema: ZodType<Input, Def, Output>
) {
  const validatedData = await schema.spa(data)

  if (!validatedData.success) {
    console.log(validatedData.error.errors[0].message)
    process.exit(1)
  }

  return validatedData.data
}
