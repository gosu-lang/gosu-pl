package gosu.web.util

class RawContent {
  var _content : Object as Content

  override function toString() : String {
    return _content?.toString()
  }
}