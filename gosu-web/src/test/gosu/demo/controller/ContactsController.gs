package demo.controller

uses gosu.web.util.IHasRequestContext
uses gosu.web.IResourceController

class ContactsController implements IHasRequestContext, IResourceController {

  override function index() : String {
    return "Index"
  }

  override function _new() : String {
    return "New"
  }

  override function create()  : String{
    return "Create"
  }

  override function show(id: String)  : String{
    return "Show"
  }

  override function edit(id: String)  : String{
    return "Edit"
  }

  override function update(id: String)  : String{
    return "Update"
  }

  function search() : String {
    return "Search"
  }

  function addresses(id : String) : String {
    return "Addresses"
  }

}