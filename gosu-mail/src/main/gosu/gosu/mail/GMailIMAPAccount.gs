package gosu.mail
/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 2/8/12
 * Time: 11:15 AM
 */
class GMailIMAPAccount extends IMAPAccount{

  construct(userName : String, password : String)
  {
    super(new GMailInboundIMAP(userName, password), new GMailOutboundSMTP(userName, password))
  }
}

