package gosu.web.util

uses java.util.Map
uses java.util.Set
uses java.util.Collection
uses java.lang.UnsupportedOperationException

class CookieJar implements Map<String, String>, IHasRequestContext {

  private construct(){}
  static var _instance = new CookieJar()
  delegate _fakeMap represents Map<String, String> = new FakeMap();

  static property get Instance() : CookieJar {
    return _instance
  }

  override function get(key: Object): String {
    return Request.Cookies[key.toString()]
  }

  /***
   * @return previous value or null if value was not set
   */
  override function put(key: String, value: String): String {
    var previous = get(key)
    set(key, value)
    return previous
  }

  /***
   * @return previous value or null if value was not set
   */
  override function remove(key: Object): String {
    var previous = get(key)
    Response.SparkJavaResponse.removeCookie(key as String)
    return previous
  }

  override function putAll(m: Map<String, String>) {
    m.eachKeyAndValue( \ k, v -> put(k, v) )
  }

  function set(cookieName : String, value : String, expires = -1, secure  = false, path  = "") {
      Response.SparkJavaResponse.cookie(path, cookieName, value, expires, secure)
  }
}