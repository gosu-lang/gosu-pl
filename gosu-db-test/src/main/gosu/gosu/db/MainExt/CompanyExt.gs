package gosu.db.foo.MainExt

uses gw.lang.reflect.features.IPropertyReference
uses gosu.db.runtime.GosuDBExt
uses gosu.db.foo.Main

uses java.lang.Iterable

class CompanyExt extends GosuDBExt<Main.Company> {

  property get Contactss() : Iterable<Main.Contact> {
    return load(Main.Contact#CompanyId)
  }

  function load<T>(pr : IPropertyReference<T, Object>) : Iterable<T> {
    return {}
  }

}