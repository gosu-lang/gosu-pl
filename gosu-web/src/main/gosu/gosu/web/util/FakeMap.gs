package gosu.web.util

uses java.util.Collection
uses java.util.Map
uses java.util.Set

public class FakeMap implements Map<String, String> {

  override public function size() : int {
    throw new UnsupportedOperationException()
  }

  override public property get Empty() : boolean {
    throw new UnsupportedOperationException()
  }

  override public function containsKey(key : Object) : boolean {
    throw new UnsupportedOperationException()
  }

  override public function containsValue(value : Object) : boolean {
    throw new UnsupportedOperationException()
  }

  override public function get(key : Object) : String {
    throw new UnsupportedOperationException()
  }

  override public function put(key : String, value : String) : String {
    throw new UnsupportedOperationException()
  }

  override public function remove(key : Object) : String {
    throw new UnsupportedOperationException()
  }

  override public function putAll(m : Map<String, String>) : void {
    throw new UnsupportedOperationException()
  }

  override public function clear() : void {
    throw new UnsupportedOperationException()
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
