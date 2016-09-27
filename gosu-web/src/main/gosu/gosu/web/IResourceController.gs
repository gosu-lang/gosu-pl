package gosu.web

interface IResourceController {

  function index() : Object
  function _new() : Object
  function create() : Object

  function show(id : String) : Object
  function edit(id : String) : Object
  function update(id : String) : Object

}