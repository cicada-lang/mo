import type { Loader } from "../../loader"
import type { Env } from "../env"
import { envEmpty, envEntries, envExtend, envLookupValue } from "../env"
import * as Errors from "../errors"
import { useGlobals } from "../globals"
import type { Stmt } from "../stmt"
import type { Value } from "../value"

export interface ModOptions {
  url: URL
  loader: Loader
}

/**

   TODO Is it safe to put the `variableCount` in a `Mod`
   (instead of using a global `variableCount`)?

**/

export class Mod {
  initialized = false
  variableCount = 0
  env: Env = envEmpty()
  exported: Set<string> = new Set()
  exportDepth: number = 0
  outputs: Map<number, string> = new Map()
  stmts: Array<Stmt> = []
  imported: Array<URL> = []

  constructor(public options: ModOptions) {}

  copy(): Mod {
    const mod = new Mod(this.options)
    mod.initialized = this.initialized
    mod.variableCount = this.variableCount
    mod.env = this.env
    mod.exported = new Set(this.exported)
    mod.outputs = new Map(this.outputs)
    mod.stmts = [...this.stmts]
    mod.imported = [...this.imported]
    return mod
  }

  async initialize(): Promise<void> {
    if (this.initialized) return
    const globals = await useGlobals()
    await globals.mount(this)
    this.initialized = true
  }

  entries(): Array<[string, Value]> {
    return envEntries(this.env)
  }

  find(name: string): Value | undefined {
    return envLookupValue(this.env, name)
  }

  freshen(name: string): string {
    const [prefix, _count] = name.split("#")
    return `${prefix}#${this.variableCount++}`
  }

  resolve(href: string): URL {
    return new URL(href, this.options.url)
  }

  async executeStmts(stmts: Array<Stmt>): Promise<void> {
    await this.initialize()

    for (const stmt of stmts.values()) {
      await stmt.prepare(this)
    }

    const offset = this.stmts.length
    for (const [index, stmt] of stmts.entries()) {
      const output = await stmt.execute(this)
      this.stmts.push(stmt)
      if (output) {
        this.outputs.set(offset + index, output)
        if (this.options.loader.options.onOutput) {
          this.options.loader.options.onOutput(output)
        }
      }
    }
  }

  executeStmtsSync(stmts: Array<Stmt>): void {
    if (!this.initialized) {
      throw new Errors.LangError(`[Mod.executeStmtsSync] not initialized mod`)
    }

    for (const stmt of stmts.values()) {
      stmt.prepareSync(this)
    }

    const offset = this.stmts.length
    for (const [index, stmt] of stmts.entries()) {
      const output = stmt.executeSync(this)
      this.stmts.push(stmt)
      if (output) {
        this.outputs.set(offset + index, output)
        if (this.options.loader.options.onOutput) {
          this.options.loader.options.onOutput(output)
        }
      }
    }
  }

  define(name: string, value: Value): void {
    if (this.exportDepth > 0) {
      this.exported.add(name)
    }

    this.env = envExtend(this.env, name, value)
  }
}
