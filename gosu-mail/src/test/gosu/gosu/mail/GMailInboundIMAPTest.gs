package gosu.mail

/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 2/1/12
 * Time: 2:18 PM
 * To change this template use File | Settings | File Templates.
 */
class GMailInboundIMAPTest extends GosuMailTestCase{

  function testInboxIsNotNull()
  {
    var name = TestAccountConfig.GMAIL_USERNAME
    var pwd = TestAccountConfig.GMAIL_PASSWORD
    var gmailIMAP = new GMailInboundIMAP(name, pwd)
    var folder = gmailIMAP.getFolder("Inbox")
    assertNotNull(folder)
  }
}