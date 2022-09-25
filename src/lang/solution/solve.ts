import { deepWalk, Solution, SolutionCons } from "../solution"
import { Value } from "../value"

export function solve(
  solution: Solution,
  left: Value,
  right: Value,
): Solution | undefined {
  left = deepWalk(solution, left)
  right = deepWalk(solution, right)

  if (left.kind === "Var" && right.kind === "Var") {
    return SolutionCons(left.name, right, solution)
  }

  if (left.kind === "Var") {
    // TODO occur check
    return SolutionCons(left.name, right, solution)
  }

  if (right.kind === "Var") {
    // TODO occur check
    return SolutionCons(right.name, left, solution)
  }

  if (left.kind === "Null" && right.kind === "Null") {
    return solution
  }

  if (left.kind === "Boolean" && right.kind === "Boolean") {
    if (left.data !== right.data) return undefined
    return solution
  }

  if (left.kind === "String" && right.kind === "String") {
    if (left.data !== right.data) return undefined
    return solution
  }

  if (left.kind === "Number" && right.kind === "Number") {
    if (left.data !== right.data) return undefined
    return solution
  }

  if (left.kind === "Arrai" && right.kind === "Arrai") {
    for (const [index, leftElement] of left.elements.entries()) {
      const rightElement = right.elements[index]
      if (rightElement === undefined) return solution
      const nextSolution = solve(solution, leftElement, rightElement)
      if (nextSolution === undefined) return undefined
      solution = nextSolution
    }

    return solution
  }

  if (left.kind === "Objekt" && right.kind === "Objekt") {
    for (const [name, leftProperty] of Object.entries(left.properties)) {
      const rightProperty = right.properties[name]
      if (rightProperty === undefined) return solution
      const nextSolution = solve(solution, leftProperty, rightProperty)
      if (nextSolution === undefined) return undefined
      solution = nextSolution
    }

    return solution
  }

  return undefined
}
