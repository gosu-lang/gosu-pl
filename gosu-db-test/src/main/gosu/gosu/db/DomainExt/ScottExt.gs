package gosu.db.foo.DomainExt

uses gosu.db.foo.Domain
uses gosu.db.runtime.GosuDBExt
uses gosu.db.runtime.SQLRecord

class ScottExt extends GosuDBExt<Domain.Scott> {

  public function sayHi(arg : String) : String {
    return("Hi, ${arg}")
  }

  property get MeaningOfLife() : int {
    return 42
  }

  function sayHiToSelf() : String {
    return Self.sayHi(Self.FirstName)
  }

}