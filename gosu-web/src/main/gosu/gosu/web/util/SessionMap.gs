package gosu.web.util

uses spark.Request
uses spark.Session
uses java.util.*

public class SessionMap implements Map<String, Object> {

  internal var session : Session
  public construct(req : Request) {
    session = req.session()
  }

  public function getSparkJavaSession() : Session {
    return session
  }

  @SuppressWarnings("unchecked")
  public function attribute<T>(name : String) : T {
    return session.attribute(name)
  }

  public function attribute(name : String, value : Object) : void {
    session.attribute(name, value)
  }

  public function getAttributes() : Set<String> {
    return session.attributes()
  }

  public function getCreationTime() : long {
    return session.creationTime()
  }

  public function getId() : String {
    return session.id()
  }

  public function getLastAccessedTime() : long {
    return session.lastAccessedTime()
  }

  public function getMaxInactiveInterval() : int {
    return session.maxInactiveInterval()
  }

  public function setMaxInactiveInterval(interval : int) : void {
    session.maxInactiveInterval(interval)
  }

  public function invalidate() : void {
    session.invalidate()
  }

  public function isNew() : boolean {
    return session.isNew()
  }

  public function removeAttribute(name : String) : void {
    session.removeAttribute(name)
  }

  override public function size() : int {
    return session.attributes().size()
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
    return session.attribute(key.toString())
  }

  override public function put(key : String, value : Object) : Object {
    session.attribute(key, value)
    return null
  }

  override public function remove(key : Object) : Object {
    session.removeAttribute(key.toString())
    return null
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
