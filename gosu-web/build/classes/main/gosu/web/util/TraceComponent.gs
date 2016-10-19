package gosu.web.util

uses java.lang.System
uses java.util.LinkedList
uses java.io.Closeable
uses java.lang.StringBuilder

class TraceComponent implements Closeable {

  var _name : String as readonly Name
  var _start : long as readonly Start
  var _end : long as readonly End
  var _parent : TraceComponent as Parent
  var _children = new LinkedList<TraceComponent>()
  var _depth : int as Depth

  construct(componentName : String, parent : TraceComponent = null) {
    _start = System.nanoTime()
    _name = componentName
    if(parent != null) {
      _parent = parent
      _depth = parent.Depth + 1
      _parent._children.add(this)
    }
  }

  override function close() {
    _end = System.nanoTime()
  }

  private function buildTrace(offset : String, sb : StringBuilder) : StringBuilder {
    for(0.._depth) {
      sb.append(offset)
    }
    var time = (_end - _start) as double / 1000000
    sb.append(Name).append(" [").append(time).append(" ms]\n")
    for(child in _children) {
      child.buildTrace(offset, sb)
    }
    return sb
  }

  function print(offset = "  ") : String  {
    return buildTrace(offset, new StringBuilder()).toString()
  }

}