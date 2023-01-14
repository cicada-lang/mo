function f() {
  print "hi"
  let x = 1
  private let y = 2
  compute x

  function f(x, y) {
    return [x, y]
  }

  hyperrule abc {
    ["a", "b"] => ["c"]
    ["a", "c"] => ["b"]
    ["b", "c"] => ["a"]
  }

  print abc(quote ["a", "a", "a"])

  rule conjunctiveNormalForm {
    not(not(x)) => x
    not(and(x, y)) => or(not(x), not(y))
    not(or(x, y)) => and(not(x), not(y))
    or(and(x, y), z) => and(or(x, z), or(y, z))
    or(x, and(y, z)) => and(or(x, y), or(x, z))
  }

  print conjunctiveNormalForm(
    quote not(and(not(A), not(B)))
  )

  if false {
    print 0
  } else if false {
    print 1
  } else if false {
    print 2
  } else {
    print 3
  }

  return
}

print f
compute f()