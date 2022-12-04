import type { GoalExp } from "../../goal-exp"
import * as GoalExps from "../../goal-exp"
import type { Mod } from "../../mod"
import { Solver } from "../../solver"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"
import {
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../../var-collection"

export class Trace extends Stmt {
  constructor(
    public steps: number,
    public goals: Array<GoalExp>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<string> {
    varCollectionValidate(
      varCollectionMerge([...this.goals.map(varCollectionFromGoalExp)]),
    )

    const goals = this.goals.map((goal) => GoalExps.evaluateGoalExp(mod, goal))
    const solver = Solver.start(goals)
    let n = 0
    while (n < this.steps && solver.partialSolutions.length > 0) {
      solver.solveStep(mod)
      n++
    }

    // const solutions = solver.solve(mod, buildSolveOptions(this.options))
    // return formatSolutions(solutions, this.pattern)

    return "TODO"
  }
}