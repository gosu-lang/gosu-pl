package gosu.web.util.metrics

uses gosu.web.util.IHasRequestContext
uses gosu.web.IResourceController
uses java.net.URLDecoder

class MetricsController implements IHasRequestContext, IResourceController {

  var _route : String
  var _filter : MetricsFilter as Filter

  construct(route : String) {
    _route = route
    _filter = new MetricsFilter()
  }

  override function index(): Object {
    Layout = MetricsLayout
    return MetricsView.renderToString(_filter, _route)
  }

  override function _new(): Object {
    return null
  }

  override function create(): Object {
    return null
  }

  override function show(id: String): Object {
    Layout = MetricsLayout
    return RouteView.renderToString(_filter, URLDecoder.decode(id, 'UTF-8'))
  }

  override function edit(id: String): Object {
    return null
  }

  override function update(id: String): Object {
    return null
  }

}