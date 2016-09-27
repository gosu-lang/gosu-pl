classpath ".."

uses demo.controller.*
uses demo.view.*
uses demo.view.layout.*
uses java.util.*
uses java.lang.Exception
uses gosu.web.GosuWebRequest
uses java.lang.Thread

extends gosu.web.GosuWebFile

StaticFiles = "/demo/public"
Layout = AppLayout

using(metering()) {

  //// Routes
  handle("/", \-> Sample.renderToString(), :verbs = { GET, POST } )

  using(beforeFilter(\ req, resp -> print(req.IP))) {
    get("/filtered", \-> "Foo!")
  }

  //Nested Routing Example
  get('/foo', \-> "Foo! ${Params['bar']}", \-> {
    using(path('/fizz')) {
      get('/buzz', \ -> 'Foo. Bar. Fizz. Buzz.')
    }
  })

  using(metering('/metering_selective')) {
    get('/selective', \ -> 'Check out the page at /metering_selective')
  }

  get('/custom/:id/ids', \ -> {Thread.sleep(700)
                               return Params['id']})

  // Post example
  post("/post_to", \-> Params['foo'] )

  // Handle example
  handle("/handle", \-> Request.IsGet )

  // Redirect example
  get("/redirect", \-> redirect("/foo") )

  // REST-ful resource example
  resource("/contacts", new ContactsController())

  // RPC Example
  rpc("/rpc", new RPCExample())

  // Nested Layout Example
  get("/nested", \-> {
    Layouts.push(NestedLayout)
    return "asdfsadf"
  })

  // Cookie example
  get("/cookie1", \-> {
    Cookies["Foo"] =  UUID.randomUUID().toString()
    redirect("/cookie2")
  })
  get("/cookie2", \-> Cookies["Foo"] )

  // Header example
  get("/header", \-> {
    Headers["X-Foo"] = "Bar"
    return "derp"
  })

  // Feature Literal Examples
  get("/fl_example", TestController#foo())
  get("/fl_static_example", TestController#staticFoo())
  get("/fl_bad", TestController#bar())

  get("/log_info", \-> {
    logInfo(Request.SparkJavaRequest.queryString())
    return "${Params['bar']}"
  })

  get("/log_info_w_block", \-> {
    logInfo(\-> "A Block Log Message!")
    return "${Params['bar']}"
  })

  get("/trace_example", \-> {

    using(traceWith("First Print")) {
      print("hello 1")
    }

    using(traceWith("Second Print")) {
      print("hello 2")
    }

    return "Check out your console!"
  })

  // exception handling
  get("/exception", \-> { throw "Foo!" } )

  onException(Exception, \ ex, req, resp -> {
    ex.printStackTrace()
    resp.Body = "Exception Handled!" + ex.Message
  })

}