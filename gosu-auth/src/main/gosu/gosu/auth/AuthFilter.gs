package gosu.auth

uses gosu.web.*
uses org.apache.shiro.subject.Subject

class AuthFilter implements IGosuWebFilter {

  override function before(req: GosuWebRequest, resp: GosuWebResponse) {
    var currentUser = req.Session["currentUser"] as Subject
    if(currentUser == null) {
      resp.redirect("/user", 302)
    } else if (!currentUser.Authenticated) {
      req.Session.remove("username")
      req.Session.remove("currentUser")
      req.Headers['X-IC-Redirect'] = "/"
      resp.redirect("/user", 302)
    }
  }

  override function after(req: GosuWebRequest, resp: GosuWebResponse) {
  }

}