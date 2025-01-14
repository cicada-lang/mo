import { formatValue } from "../format/index.ts"
import type { Goal } from "../goal/index.ts"

export function formatGoal(goal: Goal): string {
  switch (goal["@kind"]) {
    case "Apply": {
      const args = goal.args.map((arg) => formatValue(arg)).join(", ")

      if (goal.target["@kind"] === "TypeConstraint") {
        return `${goal.target.name}(${args})`
      }

      if (goal.target["@kind"] === "Relation") {
        return `${goal.target.name}(${args})`
      }

      return `${formatValue(goal.target)}(${args})`
    }

    case "Equal": {
      return `Equal(${formatValue(goal.left)}, ${formatValue(goal.right)})`
    }

    case "NotEqual": {
      return `NotEqual(${formatValue(goal.left)}, ${formatValue(goal.right)})`
    }

    case "Conj": {
      const goals = goal.goals.map(formatGoal).join(" ")
      return `conj { ${goals} }`
    }

    case "Disj": {
      const goals = goal.goals.map(formatGoal).join(" ")
      return `disj { ${goals} }`
    }
  }
}
