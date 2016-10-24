package gosu.mail

uses org.junit.Assert

uses java.lang.IllegalStateException

/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 2/9/12
 * Time: 9:13 AM
 * To change this template use File | Settings | File Templates.
 */
class EmailMessageTest extends GosuMailTestCase
{
  public function testDeletingUnsentEmailMessageThrows()
  {
    var message = new EmailMessage()
    try {
      message.delete()
      Assert.fail("Exception not thrown")
    }
    catch(ise : IllegalStateException){
    }
  }

  public function testMarkingUnsetEmailMessageReadThrows()
  {
    var message = new EmailMessage()
    try {
      message.markRead()
      Assert.fail("Exception not thrown")
    }
        catch(ise : IllegalStateException){
        }
  }

  public function testUsingTOWithMoreThanOneTOThrows()
  {
    var email = new EmailMessage()
    email.addRecipients({"abc@foo.com", "foo@bar.com"})
    try{
      email.To = "crap@foo.bar"
    }
        catch(ise : IllegalStateException){
        }
  }

  public function testTOOverwritesExistingTOIfOnlyOne()
  {
    var email = new EmailMessage()
    email.To = "nonsense@nothing.com"
    var expected = "crap@foo.bar"
    email.To = expected
    Assert.assertEquals(expected, email.Recipients.single())
  }
}
