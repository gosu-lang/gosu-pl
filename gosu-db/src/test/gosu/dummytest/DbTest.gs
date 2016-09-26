package dummytest

uses dummy.DB
uses org.junit.Test
uses org.junit.Assert#assertTrue(boolean)

class DbTest {

  @Test
  function uCanHazDb() {
    var x = new DB()
    assertTrue(x != null)
  }
  
}