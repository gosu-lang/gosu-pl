package gosu.db.foo.BarExt

uses gosu.db.runtime.SQLRecord

public class BazExt extends SQLRecord {

  public function sayHi(arg : String) {
    print("Hi, ${arg}")
  }

  property get MeaningOfLife() : int {
    return 42
  }

}