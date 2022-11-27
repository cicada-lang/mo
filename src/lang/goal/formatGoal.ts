import { formatExp } from "../exp"
import type { Goal } from "../goal"

export function formatGoal(goal: Goal): string {
  switch (goal["@kind"]) {
    case "Apply": {
      return `${goal.name} ${formatExp(goal.arg)}`
    }

    case "Equal": {
      return `${formatExp(goal.left)} = ${formatExp(goal.right)}`
    }
  }
}
