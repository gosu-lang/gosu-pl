package gosu.web

uses spark.*
uses gosu.web.util.*
uses gw.lang.function.IBlock
uses gw.lang.reflect.features.*
uses gosu.web.util.metrics.MetricsRunner
uses java.lang.System

class GosuWebRoute implements Route, IHasRequestContext {

  var _body():Object
  var _route : String

  construct(handler: Object, route : String) {
    _route = route
    if(handler typeis IBlock) {
      _body = \-> handler.invokeWithArgs({})
    } else if(handler typeis IMethodReference) {
      if(handler.MethodInfo.Parameters.length > 0) {
        _body = \-> { throw "Only no-arg methods can be used as routes!" }
      } else if(handler.MethodInfo.Static) {
        _body = \-> handler.evaluate({})
      } else if(handler typeis BoundMethodReference) {
        _body = \-> handler.evaluate({})
      } else {
        var ctor = handler.RootType.TypeInfo.getCallableConstructor({})
        if(ctor != null) {
          _body = \-> handler.evaluate({ctor.Constructor.newInstance({})})
        } else {
          _body = \-> { throw "Cannot find a no-arg contructor for ${handler.RootType}" }
        }
      }
    } else {
      _body = \-> handler
    }
  }


  override function handle(r: Request, p: Response): String {
    using(MetricsRunner.time(_route, r.requestMethod())) {
      using(traceWith("${Request.Method} ${Request.PathInfo}")) {
        var start = System.currentTimeMillis()
        logInfo( \-> "Started ${Request.Method} ${Request.PathInfo}")
        try {
          var body : Object
          using(traceWith("Invoking Handler")) {
            body = _body()
          }
          if (body typeis String) {
            using(traceWith("Rendering Layout")) {
              return Response.handleLayouts(body)
            }
          }
          if (body typeis RawContent) {
            return body.toString()
          }
          if (body typeis Json) {
            Response.Type ="application/json"
            return body.toString()
          }
          return null
        } finally {
          logInfo( \-> "Finished ${Request.Method} ${Request.PathInfo} in ${System.currentTimeMillis() - start}ms")
        }
      } finally {
        logInfo(\-> "Request Trace:\n" + Request.Trace.print())
      }
    }
  }

}