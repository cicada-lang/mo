export { Nat, Zero, Add1 }

clause Nat(zero())
clause Nat(add1(prev)) -- { Nat(prev) }

clause Zero(zero())
clause Add1(prev, add1(prev))
