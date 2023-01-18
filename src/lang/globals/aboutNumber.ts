import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutNumber(globals: GlobalStore): Promise<void> {
  globals.define(
    "Number",
    Values.TypeConstraint("Number", (value) => value["@kind"] === "Number"),
  )

  globals.primitive("add", 2, ([x, y], { mod, env }) => {
    Values.assertValue(x, "Number", { who: "add" })
    Values.assertValue(y, "Number", { who: "add" })
    return Values.Number(x.data + y.data)
  })

  globals.primitive("mul", 2, ([x, y], { mod, env }) => {
    Values.assertValue(x, "Number", { who: "mul" })
    Values.assertValue(y, "Number", { who: "mul" })
    return Values.Number(x.data * y.data)
  })

  globals.primitive("sub", 2, ([x, y], { mod, env }) => {
    Values.assertValue(x, "Number", { who: "sub" })
    Values.assertValue(y, "Number", { who: "sub" })
    return Values.Number(x.data - y.data)
  })

  globals.primitive("div", 2, ([x, y], { mod, env }) => {
    Values.assertValue(x, "Number", { who: "div" })
    Values.assertValue(y, "Number", { who: "div" })
    return Values.Number(x.data / y.data)
  })
}
