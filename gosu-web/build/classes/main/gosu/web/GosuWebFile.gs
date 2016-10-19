package gosu.web

uses spark.*
uses gosu.web.util.*
uses java.lang.*
uses gw.lang.reflect.*
uses gw.lang.reflect.gs.*
uses gw.lang.*
uses java.io.File
uses spark.utils.SparkUtils
uses java.io.Closeable
uses java.util.Stack
uses java.util.LinkedList
uses gosu.web.util.metrics.*
uses com.codahale.metrics.MetricRegistry

abstract class GosuWebFile implements IHasRequestContext, IManagedProgramInstance {

  static var _staticFilesSet = false;
  static var _filterStack = new Stack<IGosuWebFilter>()
  static var _pathQueue = new LinkedList<String>()
  static var _metricsStack : Stack<MetricRegistry> as MetricsStack = new()
  static var _setup : block(req:spark.Request, resp:spark.Response)

  construct(){
    // Look for a PORT environment variable
    var port = System.Env["PORT"]
    if (port != null) {
      Port = Integer.parseInt(port)
    }
    _setup = \req , resp -> GosuWebRequestSupport.set(req, resp)
  }

  //===================================================================
  //  Configuration Support
  //===================================================================
  property set StaticFiles(path : String) {
    if(!_staticFilesSet) {
      _staticFilesSet = true;
      if(new File(".", path).exists()){
        Spark.externalStaticFileLocation(new File(".", path).AbsolutePath)
      } else if(new File(path).exists()) {
        Spark.externalStaticFileLocation(new File(path).AbsolutePath)
      } else {
        Spark.staticFileLocation(path)
      }
    } else {
      logError( \-> "Cannot reinitialize static directory: ${path}")
    }
  }

  property set Port(port : int) {
    Spark.port(port)
  }

  //===================================================================
  //  Routing Support
  //===================================================================

  function get(path : String, handler: Object, routes : block() = null) {
    path = nested(path)
    applyFilters(path)
    Spark.get((path), new GosuWebRoute(handler, path))
    handleRoutes(path, routes)
  }

  function post(path : String, handler: Object, routes : block() = null) {
    path = nested(path)
    applyFilters(path)
    Spark.post(path, new GosuWebRoute(handler, path))
    handleRoutes(path, routes)
  }

  function put(path : String, handler: Object, routes : block() = null) {
    path = nested(path)
    applyFilters(path)
    Spark.put(path, new GosuWebRoute(handler, path))
    handleRoutes(path, routes)
  }

  function patch(path : String, handler: Object, routes : block() = null) {
    path = nested(path)
    applyFilters(path)
    Spark.patch(path, new GosuWebRoute(handler, path))
    handleRoutes(path, routes)
  }

  function delete(path : String, handler: Object, routes : block() = null) {
    path = nested(path)
    applyFilters(path)
    Spark.delete(path, new GosuWebRoute(handler, path))
    handleRoutes(path, routes)
  }

  function head(path : String, handler: Object, routes : block() = null) {
    path = nested(path)
    applyFilters(path)
    Spark.head(path, new GosuWebRoute(handler, path))
    handleRoutes(path, routes)
  }

  function trace(path : String, handler: Object, routes : block() = null) {
    path = nested(path)
    applyFilters(path)
    Spark.trace(path, new GosuWebRoute(handler, path))
    handleRoutes(path, routes)
  }

  function connect(path : String, handler: Object, routes : block() = null) {
    path = nested(path)
    applyFilters(path)
    Spark.connect(path, new GosuWebRoute(handler, path))
    handleRoutes(path, routes)
  }

  function options(path : String, handler: Object, routes : block() = null) {
    path = nested(path)
    applyFilters(path)
    Spark.options(path, new GosuWebRoute(handler, path))
    handleRoutes(path, routes)
  }

  function handle(path: String, handler: Object, verbs : List<GosuWebRequest.HttpVerb> = null) {
    if(verbs == null) {
      verbs = GosuWebRequest.HttpVerb.AllValues
    }
    if(verbs.contains(GosuWebRequest.HttpVerb.GET)) get(path, handler)
    if(verbs.contains(GosuWebRequest.HttpVerb.POST)) post(path, handler)
    if(verbs.contains(GosuWebRequest.HttpVerb.PUT)) put(path, handler)
    if(verbs.contains(GosuWebRequest.HttpVerb.PATCH)) patch(path, handler)
    if(verbs.contains(GosuWebRequest.HttpVerb.DELETE)) delete(path, handler)
    if(verbs.contains(GosuWebRequest.HttpVerb.HEAD)) head(path, handler)
    if(verbs.contains(GosuWebRequest.HttpVerb.TRACE)) trace(path, handler)
    if(verbs.contains(GosuWebRequest.HttpVerb.CONNECT)) connect(path, handler)
    if(verbs.contains(GosuWebRequest.HttpVerb.OPTIONS)) options(path, handler)
  }

  function resource(path : String, controller : IResourceController) {
    // Basic collection REST-ful URLs
    get(path, \-> controller.index())
    get(path + "/new", \-> controller._new())
    post(path, \-> controller.create())

    // Additional methods
    if(controller.IntrinsicType.TypeInfo typeis IRelativeTypeInfo) {
      var publicMethods = controller.IntrinsicType.TypeInfo.DeclaredMethods.where( \ m -> m.Public && not m.Static )
      for(m in publicMethods) {
        if(!{"index", "_new", "show", "create", "edit", "update"}.contains(m.DisplayName)) {
          if(m.Parameters.length == 0){
            handle(path + "/" + m.DisplayName.toLowerCase(), \-> m.CallHandler.handleCall(controller, {}))
          }
          else if(m.Parameters.length == 1 && m.Parameters[0].FeatureType == String)
          {
            handle(path + "/:id/" + m.DisplayName.toLowerCase(), \-> m.CallHandler.handleCall(controller, {Params['id']}))
          }
        }
      }
    }

    // Basic instance REST-ful URLs
    get(path + "/:id", \-> controller.show(Params['id']))
    get(path + "/:id/edit", \-> controller.edit(Params['id']))
    handle(path + "/:id", \-> controller.update(Params['id']), :verbs = {PUT, POST})
  }

  function rpc(path : String, controller : Object) {
    var typeInfo = (typeof controller).TypeInfo
    if(typeInfo typeis IRelativeTypeInfo) {
      var publicMethods = typeInfo.DeclaredMethods.where( \ m -> m.Public && not m.Static )
      var addedMethods = {}
      for(m in publicMethods) {
        if(!addedMethods.contains(m.DisplayName)) {
          handle(path + "/" + m.DisplayName.toLowerCase(), \-> m.CallHandler.handleCall(controller, ParamConverter.populateArgs(Params, m.Parameters)))
        } else {
          throw "Overloaded method now allowed in RPC endpoints: ${typeInfo.DisplayName}.${m.DisplayName}"
        }
      }
    }
  }

  function onException(ex : Class<Exception>, blk : block(ex:Exception, req:GosuWebRequest , resp:GosuWebResponse)) {
    Spark.exception(ex, \ e, r, p -> blk(e, Request, Response))
  }

  //===================================================================
  // Nested Path Support
  //===================================================================

  function path(path : String) : Closeable {
    _pathQueue.add(path)
    return new CloseableBlock(\-> _pathQueue.remove())
  }

  private function handleRoutes(path : String, routes : block()) {
    _pathQueue.add(path)
    if (routes != null) routes()
    _pathQueue.pop()
  }

  private function nested(original : String) : String {
    var newPath = new StringBuffer()
    for (path in _pathQueue) {
      newPath.append(path)
    }
    newPath.append(original)
    return newPath.toString()
  }

  //===================================================================
  // Filtering Support
  //===================================================================

  function filter(filter : IGosuWebFilter) : Closeable {
    _filterStack.push(filter)
    return new CloseableBlock(\-> _filterStack.pop())
  }

  function filters(filters : List<IGosuWebFilter>) : Closeable {
    filters.each(\ f -> _filterStack.push(f))
    return new CloseableBlock(\-> filters.each(\ f -> _filterStack.pop() ))
  }

  function beforeFilter(blk : block(req: GosuWebRequest, resp: GosuWebResponse)) : Closeable {
    return filter(IGosuWebFilter.UTIL.wrapBefore( blk ))
  }

  function beforeFilters(filters : List<block(req: GosuWebRequest, resp: GosuWebResponse)>) : Closeable {
    filters.each(\ f -> _filterStack.push(IGosuWebFilter.UTIL.wrapBefore( f )))
    return new CloseableBlock(\-> filters.each(\ f -> _filterStack.pop() ))
  }

  function afterFilter(blk : block(req: GosuWebRequest, resp: GosuWebResponse)) : Closeable {
    return filter(IGosuWebFilter.UTIL.wrapAfter( blk ))
  }

  function afterFilters(filters : List<block(req: GosuWebRequest, resp: GosuWebResponse)>) : Closeable {
    filters.each(\ f -> _filterStack.push(IGosuWebFilter.UTIL.wrapAfter( f )))
    return new CloseableBlock(\-> filters.each(\ f -> _filterStack.pop() ))
  }

  // Telescope through the stack of filters
  private function applyFilters(path : String) {
    maybeInitRequestSetupFilter()
    for (currentFilter in _filterStack) {
      Spark.before(path, \ r, p -> currentFilter.before(Request, Response))
    }
    for (currentFilter in _filterStack.reverse()) {
      Spark.after(path, \ r, p -> currentFilter.after(Request, Response))
    }
  }

  function before(handler : block(req:GosuWebRequest , resp:GosuWebResponse), path : String = SparkUtils.ALL_PATHS, acceptType: String = null) {
    Spark.before(path, acceptType, \ r, p -> handler(Request, Response))
  }

  function after(handler : block(req:GosuWebRequest , resp:GosuWebResponse), path : String = SparkUtils.ALL_PATHS, acceptType: String = null) {
    Spark.after(path, acceptType, \ r, p -> handler(Request, Response))
  }

  function metering(path : String = null) : Closeable {
    var controller = new MetricsController(path ?: '/metering')
    resource(path ?: '/metering', controller)
    return filter(controller.Filter)
  }

  //===================================================================
  // Command line arg handling
  //===================================================================

  override function afterExecution( t : Throwable ) {
    maybeInitRequestSetupFilter()
    Spark.after( \req, resp -> GosuWebRequestSupport.clear() )
    if(t != null) {
      print("Error when evaluating SparkFile:")
      t.printStackTrace()
    }
  }

  function maybeInitRequestSetupFilter() {
    if(_setup != null) {
      Spark.before(_setup)
      _setup = null
    }
  }

  override function beforeExecution() : boolean {
    if(Gosu.RawArgs != null && Gosu.RawArgs.size() > 1) {
      if(Gosu.RawArgs[0] == "--port") {
        Port = Gosu.RawArgs[1].toInt()
      }
    }
    return true
  }

}