package gosu.db.validation

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses gosu.db.GosuDB
uses gosu.db.Validation
uses gosu.db.Validation.*

/**
 * Created by carson on 8/10/15.
 */
class ValidationTest {

  @BeforeClass
  static function beforeClass() {
    GosuDB.setDBUrl("jdbc:h2:mem:validationtest;DB_CLOSE_DELAY=-1");
    GosuDB.execStatement(Validation.SqlSource)
  }

  @Before
  function clearDomainDB() {
    Validation.Tables.each(\t -> t.deleteAll(true))
  }

  @Test
  function basicValidation() {
    var contact = new Validation.Contact()
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = ""
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "Test"
    Assert.assertTrue(contact.IsValid)
  }

}