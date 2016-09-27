package gosu.web.util

class Json {
  var _content : Object as Content

  override function toString() : String {
    return _content?.toString()
  }
}