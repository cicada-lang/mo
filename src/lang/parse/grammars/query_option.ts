export const query_option = {
  $grammar: {
    "query_option:limit": ['"limit"', { value: { $pattern: ["number"] } }],
    "query_option:debug": ['"debug"'],
  },
}