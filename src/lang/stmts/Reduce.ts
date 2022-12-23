import { evaluate, evaluateRewriteRuleExp } from "../evaluate"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import { reduce } from "../reduce"
import * as RewriteRules from "../rewrite-rule"
import type { RewriteRuleExp } from "../rewrite-rule-exp"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import { formatValue } from "../value"
import {
  varCollectionFromRewriteRuleExp,
  varCollectionValidate,
} from "../var-collection"

export class Reduce extends Stmt {
  constructor(
    public exp: Exp,
    public rules: Array<RewriteRuleExp>,
    public span?: Span,
  ) {
    super()
  }

  async validate(mod: Mod): Promise<void> {
    for (const rule of this.rules) {
      varCollectionValidate(varCollectionFromRewriteRuleExp(rule))
    }
  }

  async execute(mod: Mod): Promise<string> {
    const value = evaluate(mod, mod.env, this.exp)
    const rules = this.rules.map((rule) =>
      evaluateRewriteRuleExp(mod, mod.env, rule),
    )
    const rule = RewriteRules.List(rules)
    const result = reduce(mod, rule, value)
    return formatValue(result)
  }
}
