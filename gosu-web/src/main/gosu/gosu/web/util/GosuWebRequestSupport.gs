package gosu.web.util

uses gosu.web.*
uses java.lang.*

class GosuWebRequestSupport {

  static var _REQUEST = new ThreadLocal<GosuWebRequest>()
  static var _RESPONSE = new ThreadLocal<GosuWebResponse>()

  static function set(rawReq: spark.Request, rawResp: spark.Response) {
    var req = new GosuWebRequest (rawReq)
    var resp = new GosuWebResponse (rawResp)
    _REQUEST.set(req);
    _RESPONSE.set(resp);
  }

  static property get Request(): GosuWebRequest {
    return _REQUEST.get()
  }

  static property get Response(): GosuWebResponse {
    return _RESPONSE.get()
  }

  static function clear() {
    //_REQUEST.set(null)
    //_RESPONSE.set(null)
    _REQUEST.remove()
    _RESPONSE.remove()
  }
}