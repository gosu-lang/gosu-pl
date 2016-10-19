package gosu.web.util

uses org.slf4j.LoggerFactory
uses org.slf4j.Logger
uses java.lang.Throwable
uses gw.lang.function.IFunction0

enhancement IHasRequestLogEnhancement : IHasRequestLog {

  function logInfo(message: Object) {
    if (Logger.isInfoEnabled()) {
      Logger.info(toStr(message))
    }
  }

  function logError(message: Object, ex: Throwable = null) {
    if (Logger.isErrorEnabled()) {
      if (ex == null) {
        Logger.error(toStr(message))
      } else {
        Logger.error(toStr(message), ex)
      }
    }
  }

  function logDebug(message: Object) {
    if (Logger.isDebugEnabled()) {
      Logger.debug(toStr(message))
    }
  }

  function logWarn(message: Object) {
    if (Logger.isWarnEnabled()) {
      Logger.warn(toStr(message))
    }
  }

  function logTrace(message: Object) {
    if (Logger.isTraceEnabled()) {
      Logger.trace(toStr(message))
    }
  }

  private property get Logger() : Logger {
    return LoggerFactory.getLogger("Request [${GosuWebRequestSupport.Request.RequestID}]")
  }

  private function toStr(o : Object) : String{
    if(o typeis IFunction0) {
      return o.invoke()?.toString()
    } else {
      return o?.toString()
    }
  }
}
