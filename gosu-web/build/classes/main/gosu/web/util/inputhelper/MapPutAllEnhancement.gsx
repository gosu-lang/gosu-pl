package gosu.web.util.inputhelper

uses java.util.Map

enhancement MapPutAllEnhancement : java.util.Map {

  function merge(from : Map<Object,Object>) : Map<Object,Object> {
    if (from != null) this.putAll(from)
    return this
  }

}
