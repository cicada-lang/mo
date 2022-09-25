export const stmt = {
  $grammar: {
    "stmt:fact": [{ name: "name" }, { exp: "exp" }],
    "stmt:rule": [
      { name: "name" },
      { exp: "exp" },
      "dashline",
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:query": [
      '"query"',
      '"("',
      { names: "names" },
      '")"',
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:query_no_name": ['"query"', '"{"', { goals: "goals" }, '"}"'],
    "stmt:query_no_name_2": [
      '"query"',
      '"("',
      '")"',
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:success": [
      '"success"',
      '"("',
      { names: "names" },
      '")"',
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:success_no_name": ['"success"', '"{"', { goals: "goals" }, '"}"'],
    "stmt:success_no_name_2": [
      '"success"',
      '"("',
      '")"',
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:failure": [
      '"failure"',
      '"("',
      { names: "names" },
      '")"',
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:failure_no_name": ['"failure"', '"{"', { goals: "goals" }, '"}"'],
    "stmt:failure_no_name_2": [
      '"failure"',
      '"("',
      '")"',
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}