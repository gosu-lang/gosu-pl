package gosu.web

uses gw.lang.reflect.ReflectUtil
uses spark.Response
uses java.util.Stack
uses spark.Spark

class GosuWebResponse {

  var _response : Response as SparkJavaResponse
  var _layouts : Stack<GosuWebLayout> as Layouts
  static var DEFAULT_LAYOUT : GosuWebLayout as DefaultLayout

  construct(response : Response) {
    _response = response
    _layouts = {}
    if(DEFAULT_LAYOUT != null) {
      _layouts.push(DEFAULT_LAYOUT)
    }
  }

  function redirect(to : String, code = 302) {
    _response.redirect(to)
    Spark.halt(code)
  }

  property set Status(val : int) {
    _response.status(val)
  }

  property set Type(type : String) {
    _response.type(type)
  }

  property set Body(content:String) {
    _response.body(handleLayouts(content))
  }

  property get Body() : String {
    return _response.body()
  }

  function handleLayouts(body: String): String {
    while (_layouts.HasElements) {
      var layout = _layouts.pop()
      body = ReflectUtil.invokeMethod( layout, "renderToString", {body} ) as String
    }
    return body
  }
}