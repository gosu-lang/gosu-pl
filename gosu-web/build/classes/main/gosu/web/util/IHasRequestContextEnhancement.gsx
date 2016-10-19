package gosu.web.util

uses gosu.web.*
uses spark.Spark
uses javax.servlet.http.HttpServletResponse
uses java.util.Stack
uses com.google.gson.Gson
uses java.io.Closeable

enhancement IHasRequestContextEnhancement: IHasRequestContext {

  /*
    Return the raw value of the string, ignore layouts
   */
  function raw(str : Object) : RawContent {
    return new() {:Content = str}
  }

  function json(obj : Object) : Json {
    return new() {:Content = (new Gson().toJson(obj))}
  }

  function halt(code = HttpServletResponse.SC_OK, message = "") {
    Spark.halt(code, message)
  }

  property get Request() : GosuWebRequest {
    return GosuWebRequestSupport.Request
  }

  property get Response() : GosuWebResponse {
    return GosuWebRequestSupport.Response
  }

  property get Params() : ParamMap  {
    return Request.Params
  }

  property get Session() : SessionMap {
    return Request.Session
  }

  property get Cookies() : CookieJar {
    return CookieJar.Instance
  }

  property get Headers() : HeaderMap {
    return HeaderMap.Instance
  }

  property get Layouts() : Stack<GosuWebLayout> {
    return Response.Layouts
  }

  function traceWith(str : String) : Closeable {
    return Request.Trace.traceWith(str)
  }

  property set Layout(layout : GosuWebLayout) {
    if(Response != null) {
      Response.Layouts.clear()
      if(layout != null) {
        Response.Layouts.push(layout)
      }
    } else {
      GosuWebResponse.DefaultLayout = layout
    }
  }

  function redirect(to: String, code = 302) {
    Response.redirect(to, code)
  }
}