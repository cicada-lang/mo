import type { Exp } from "../exp"
import { Solution, solutionWalk } from "../solution"

export function occur(solution: Solution, name: String, exp: Exp): boolean {
  exp = solutionWalk(solution, exp)

  switch (exp["@kind"]) {
    case "PatternVar": {
      return exp.name === name
    }

    case "ArrayCons": {
      return occur(solution, name, exp.car) || occur(solution, name, exp.cdr)
    }

    case "Objekt": {
      return Object.values(exp.properties).some((property) =>
        occur(solution, name, property),
      )
    }

    case "Data": {
      return exp.args.some((arg) => occur(solution, name, arg))
    }

    default: {
      return false
    }
  }
}
