package gosu.web.util

uses spark.Request
uses java.util.Collection
uses java.util.Map
uses java.util.Set

public class AttributesMap implements Map<String, Object> {

  internal var _req : Request
  public construct(req : Request) {
    _req = req
  }

  override public function size() : int {
    return _req.attributes().size()
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

  override public function get(key : Object) : Object {
    return _req.attribute(key.toString())
  }

  override public function put(key : String, value : Object) : Object {
    _req.attribute(key, value)
    return null
  }

  override public function remove(key : Object) : String {
    throw new UnsupportedOperationException("Immutable map")
  }

  override public function putAll(m : Map<String, Object>) : void {
    throw new UnsupportedOperationException("")
  }

  override public function clear() : void {
    throw new UnsupportedOperationException("Immutable map")
  }

  override public function keySet() : Set<String> {
    throw new UnsupportedOperationException()
  }

  override public function values() : Collection<Object> {
    throw new UnsupportedOperationException()
  }

  override public function entrySet() : Set<Entry<String, Object>> {
    throw new UnsupportedOperationException()
  }

}
