function f() {
  print "hi"
  let x = 1
  export let y = 2
  compute x

  function f(x, y) {
    return [x, y]
  }

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
