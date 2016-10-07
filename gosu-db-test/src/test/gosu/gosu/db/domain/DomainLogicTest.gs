package gosu.db.domain

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses gosu.db.foo.Domain
uses gosu.db.foo.Domain.*
uses gosu.db.GosuDB
uses gosu.db.plugin.ISQLDdlType

uses java.lang.Double

class DomainLogicTest {

  @BeforeClass
  static function beforeClass(){
    GosuDB.setDBUrl("jdbc:h2:mem:domainlogictest;DB_CLOSE_DELAY=-1");
    GosuDB.execStatement(Domain.SqlSource)
  }

  @Before
  function clearDomainDB(){
    Domain.Tables.each(\t -> t.deleteAll(true))
  }

  @Test
  function getDomainLogicMethod() {
    var s = new Domain.Scott()
    s.FirstName = "Scott"
    s.create()

    var scott = Scott.where(Scott#FirstName.isEqualTo("Scott")).first()
    Assert.assertNotNull(scott)
    Assert.assertEquals("Hi, Kyle", scott.sayHi("Kyle"))
  }

  @Test
  function selfReferenceWorks() {
    var scott = new Scott() {
      :FirstName = "Scott"
    }

    Assert.assertEquals("Hi, Scott", scott.sayHiToSelf())
  }

  @Test
  function getDomainLogicProperty() {
    var s = new Scott()
    s.FirstName = "Scott"
    s.create()



    var scott = Scott.where(Scott#FirstName.isEqualTo("Scott")).first()
    Assert.assertNotNull(scott)
    Assert.assertEquals(42, scott.MeaningOfLife)
  }

}