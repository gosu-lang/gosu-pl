package gosu.web.util.metrics

uses gosu.web.IGosuWebFilter
uses com.codahale.metrics.MetricRegistry
uses gosu.web.GosuWebRequest
uses gosu.web.GosuWebResponse
uses gosu.web.GosuWebFile

class MetricsFilter implements IGosuWebFilter {

  var _metrics : MetricRegistry as Metrics

  construct() {
    _metrics = new()
  }

  override function before(req: GosuWebRequest, resp: GosuWebResponse) {
    GosuWebFile.MetricsStack.push(_metrics)
  }

  override function after(req: GosuWebRequest, resp: GosuWebResponse) {
    GosuWebFile.MetricsStack.pop()
  }

}