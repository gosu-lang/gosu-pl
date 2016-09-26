package dummytest

uses dummy.Web
uses org.junit.Test
uses org.junit.Assert#assertTrue(boolean)

class WebTest {

  @Test
  function uCanHazWeb() {
    var x = new Web()
    assertTrue(x != null)
  }
  
}