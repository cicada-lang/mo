export const stmt = {
  $grammar: {
    "stmt:clause_no_goals_no_name": [
      '"clause"',
      { name: "relation_name" },
      { args: "args" },
    ],
    "stmt:clause_no_goals": [
      '"clause"',
      { name: "relation_name" },
      { args: "args" },
      "dashline",
      { clause_name: "clause_name" },
    ],
    "stmt:clause_no_name": [
      '"clause"',
      { name: "relation_name" },
      { args: "args" },
      "dashline",
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:clause": [
      '"clause"',
      { name: "relation_name" },
      { args: "args" },
      "dashline",
      { clause_name: "clause_name" },
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "stmt:import": [
      '"import"',
      '"{"',
      { bindings: { $ap: ["zero_or_more", "import_binding"] } },
      '"}"',
      '"from"',
      { path: { $pattern: ["string"] } },
    ],
    "stmt:import_all": [
      '"import"',
      '"*"',
      '"from"',
      { path: { $pattern: ["string"] } },
    ],
    "stmt:import_all_as": [
      '"import"',
      '"*"',
      '"as"',
      { name: "variable_name" },
      '"from"',
      { path: { $pattern: ["string"] } },
    ],
    "stmt:export": ['"export"', { stmt: "stmt" }],
    "stmt:export_names": [
      '"export"',
      '"{"',
      { names: "variable_names" },
      '"}"',
    ],
    "stmt:let": ['"let"', { pattern: "exp" }, '"="', { exp: "exp" }],
    "stmt:print": ['"print"', { exp: "exp" }],
    "stmt:compute": ['"compute"', { exp: "exp" }],
    "stmt:fn": [
      '"function"',
      { name: "variable_name" },
      { patterns: "args" },
      '"{"',
      { stmts: "stmts" },
      '"}"',
    ],
    "stmt:return": ['"return"', { exp: "exp" }],
    "stmt:return_null": ['"return"'],
    "stmt:assert": ['"assert"', { exp: "exp" }],
    "stmt:if": [
      '"if"',
      { target: "exp" },
      '"{"',
      { stmts: "stmts" },
      '"}"',
      { else_ifs: "else_ifs" },
    ],
    "stmt:if_else": [
      '"if"',
      { target: "exp" },
      '"{"',
      { stmts: "stmts" },
      '"}"',
      { else_ifs: "else_ifs" },
      '"else"',
      '"{"',
      { else_stmts: "stmts" },
      '"}"',
    ],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
