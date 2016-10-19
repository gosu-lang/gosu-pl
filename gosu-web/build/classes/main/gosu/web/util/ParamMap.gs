package gosu.web.util

uses spark.Request
uses java.util.Collection
uses java.util.Map
uses java.util.Set

public class ParamMap implements Map<String, String> {

  internal var _req : Request
  public construct(req : Request) {
    _req = req
  }

  override public function size() : int {
    return _req.queryParams().size()
  }

  override public property get Empty() : boolean {
    return size() == 0
  }

  override public function containsKey(key : Object) : boolean {
    return get(key) != null
  }

  override public function containsValue(value : Object) : boolean {
    throw new UnsupportedOperationException()
  }

  override public function get(key : Object) : String {
    var val : String = _req.params(key.toString())
    if (val != null) {
      return val
    } else {
      return _req.queryParams(key.toString())
    }
  }

  public function all(key : Object) : String[] {
    return _req.raw().getParameterValues(key.toString())
  }

  override public function put(key : String, value : String) : String {
    throw new UnsupportedOperationException("Immutable map")
  }

  override public function remove(key : Object) : String {
    throw new UnsupportedOperationException("Immutable map")
  }

  override public function putAll(m : Map<String, String>) : void {
    throw new UnsupportedOperationException("Immutable map")
  }

  override public function clear() : void {
    throw new UnsupportedOperationException("Immutable map")
  }

  override public function keySet() : Set<String> {
    throw new UnsupportedOperationException()
  }

  override public function values() : Collection<String> {
    throw new UnsupportedOperationException()
  }

  override public function entrySet() : Set<Entry<String, String>> {
    throw new UnsupportedOperationException()
  }

}
