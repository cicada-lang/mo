// Max [null, n, n]
// ---------------- {}

// Max [cons(x, rest), n, max]
// ---------------------------- {
//   Max [rest, x, max]
//   equation x > n
// }

// Max [cons (x, rest), n, max]
// ---------------------------- {
//   Max [rest, n, max]
//   equation x <= n
// }

// // TODO We need to view `Array` as `cons` and `null` here.

// query (max) { Max [[3, 1, 4, 1, 5, 8, 2, 6], 0, max] }
// query (max) { Max [[3, 1, 4, 1, 5, 8, 2, 6], 9, max] }
// query (max) { Max [[2, 4, 7, 7, 7, 2, 1, 6], 5, max] }
