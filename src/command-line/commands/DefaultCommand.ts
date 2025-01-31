import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import * as Commands from "../commands/index.ts"

type Args = { file?: string }
type Opts = { help?: boolean; version?: boolean }

export class DefaultCommand extends Command<Args, Opts> {
  name = "default"

  description = "Run an file"

  args = { file: ty.optional(ty.string()) }
  opts = {
    help: ty.optional(ty.boolean()),
    version: ty.optional(ty.boolean()),
  }
  alias = { help: ["h"], version: ["v"] }

  async execute(argv: Args & Opts, runner: CommandRunner): Promise<void> {
    if (argv["help"]) {
      const command = new Commands.CommonHelp()
      await command.execute({}, runner)
      return
    }

    if (argv["version"]) {
      console.log(`2024-04-24`)
      return
    }

    const file = argv["file"]

    if (file === undefined) {
      const command = new Commands.CommonHelp()
      await command.execute({}, runner)
      return
    } else {
      const command = new Commands.RunCommand()
      await command.execute({ file })
    }
  }
}
