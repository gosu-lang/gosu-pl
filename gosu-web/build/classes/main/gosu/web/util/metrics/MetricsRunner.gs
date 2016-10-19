package gosu.web.util.metrics

uses java.io.Closeable
uses com.codahale.metrics.Timer
uses gosu.web.GosuWebFile

class MetricsRunner implements Closeable {

  static var TIMER_DELIMITER : String as TimerDelimiter = '__timer__'
  var _timers : List<Timer.Context>

  static function time(route : String, verb : String) : MetricsRunner {
    return new MetricsRunner().startTimers(route, verb)
  }

  function startTimers(route : String, verb : String) : MetricsRunner {
    _timers = {}
    for (metrics in GosuWebFile.MetricsStack) {
      _timers.add(metrics.timer(TIMER_DELIMITER + verb + ": "+ route).time())
    }
    return this
  }

  override function close() {
    for (timer in _timers) {
      timer.stop()
    }
  }

}