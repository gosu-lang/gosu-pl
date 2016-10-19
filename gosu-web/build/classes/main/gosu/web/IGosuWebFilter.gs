package gosu.web

interface IGosuWebFilter {
  function before(req : GosuWebRequest, resp : GosuWebResponse)
  function after(req : GosuWebRequest, resp : GosuWebResponse)
  static var UTIL : Util = new Util()
  static class Util {

    function wrapBefore(blk : block(req: GosuWebRequest, resp: GosuWebResponse)) : IGosuWebFilter {
      return new IGosuWebFilter() {
        override function before(req: GosuWebRequest, resp: GosuWebResponse) {
          blk(req, resp);
        }
        override function after(req: GosuWebRequest, resp: GosuWebResponse) {
        }
      }
    }

    function wrapAfter(blk : block(req: GosuWebRequest, resp: GosuWebResponse)) : IGosuWebFilter {
      return new IGosuWebFilter() {
        override function before(req: GosuWebRequest, resp: GosuWebResponse) {
        }
        override function after(req: GosuWebRequest, resp: GosuWebResponse) {
          blk(req, resp);
        }
      }
    }
  }
}