package gosu.web.util

uses java.lang.reflect.Method
uses java.lang.reflect.Proxy
uses java.util.Map
uses java.util.Set
uses java.util.Collection
uses java.lang.UnsupportedOperationException

class HeaderMap implements Map<String, String>, IHasRequestContext {

  private construct(){}
  static var _instance = new HeaderMap()
  delegate _fakeMap represents Map<String, String> = new FakeMap();

  static property get Instance() : HeaderMap {
    return _instance
  }

  override function get(key: Object): String {
    return Request.SparkJavaRequest.headers(key.toString())
  }

  override function put(key: String, value: String): String {
    Response.SparkJavaResponse.header(key, value)
    return ""
  }

  override function putAll(m: Map<String, String>) {
    m.eachKeyAndValue( \ k, v -> put(k, v) )
  }

}