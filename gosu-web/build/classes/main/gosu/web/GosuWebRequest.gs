package gosu.web

uses java.util.*
uses spark.*
uses gosu.web.util.*

class GosuWebRequest implements IHasRequestLog {

  enum HttpVerb {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE,
    HEAD,
    TRACE,
    CONNECT,
    OPTIONS,
  }

  var _id : String as RequestID =  UUID.randomUUID().toString()
  var _params : ParamMap as readonly Params
  var _attributes : Map<String, Object> as readonly Attributes
  var _request : Request as readonly SparkJavaRequest
  var _session : SessionMap as readonly Session
  var _trace : Trace as Trace

  construct(request:Request) {
    _request = request;
    _params = new ParamMap(SparkJavaRequest)
    _attributes = new AttributesMap(SparkJavaRequest)
    _session = new SessionMap(SparkJavaRequest)
    _trace = new Trace()
  }

  //----------------------------------------------------------------------
  // HTTP Method Helpers
  //----------------------------------------------------------------------
  property get IsGet() : boolean {
    return _request.requestMethod().equalsIgnoreCase(HttpVerb.GET.toString())
  }

  property get IsPost() : boolean {
    return _request.requestMethod().equalsIgnoreCase(HttpVerb.POST.toString())
  }

  property get IsPut() : boolean {
    return _request.requestMethod().equalsIgnoreCase(HttpVerb.PUT.toString())
  }

  property get IsPatch() : boolean {
    return _request.requestMethod().equalsIgnoreCase(HttpVerb.PATCH.toString())
  }

  property get IsDelete() : boolean {
    return _request.requestMethod().equalsIgnoreCase(HttpVerb.DELETE.toString())
  }

  property get IsHead() : boolean {
    return _request.requestMethod().equalsIgnoreCase(HttpVerb.HEAD.toString())
  }

  property get IsTrace() : boolean {
    return _request.requestMethod().equalsIgnoreCase(HttpVerb.TRACE.toString())
  }

  property get IsConnect() : boolean {
    return _request.requestMethod().equalsIgnoreCase(HttpVerb.CONNECT.toString())
  }

  property get IsOptions() : boolean {
    return _request.requestMethod().equalsIgnoreCase(HttpVerb.OPTIONS.toString())
  }

  property get Method() : String {
    return _request.requestMethod()
  }

  //----------------------------------------------------------------------
  // Pass Through API
  //----------------------------------------------------------------------

  property get ContentType() : String {
    return _request.contentType()
  }

  property get Body() : String {
    return _request.body()
  }

  property get ContentLength() : int {
    return _request.contentLength()
  }

  property get ContextPath() : String {
    return _request.contextPath()
  }

  property get Cookies() : Map<String, String> {
    return _request.cookies()
  }

  property get Headers() : Set<String> {
    return _request.headers()
  }

  property get Host() : String {
    return _request.host()
  }

  property get IP() : String {
    return _request.ip()
  }

  property get PathInfo() : String {
    return _request.pathInfo()
  }

  property get UserAgent() : String {
    return _request.userAgent()
  }

  property get Splat() : String[] {
    return _request.splat()
  }

  property get Scheme() : String {
    return _request.scheme()
  }

  property get URL() : String {
    return _request.url()
  }

  property get Port() : int {
    return _request.port()
  }

  property get QueryMap() : QueryParamsMap {
    return _request.queryMap()
  }

}