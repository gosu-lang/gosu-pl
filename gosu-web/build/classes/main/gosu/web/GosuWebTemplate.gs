package gosu.web

uses gosu.web.util.GosuWebRequestSupport
uses java.util.Stack
uses java.util.Map
uses gosu.web.util.SessionMap
uses gosu.web.util.CookieJar
uses gw.lang.reflect.features.PropertyReference
uses gosu.web.util.inputhelper.InputGenerator

class GosuWebTemplate {

  static property get Request() : GosuWebRequest {
    return GosuWebRequestSupport.Request
  }

  static property get Response() : GosuWebResponse {
    return GosuWebRequestSupport.Response
  }

  static property get Layouts() : Stack<GosuWebLayout> {
    return Response.Layouts
  }

  static property get Params() : Map<String, String>  {
    return Request.Params
  }

  static property get Session() : SessionMap {
    return Request.Session
  }

  static property get Cookies() : CookieJar {
    return CookieJar.Instance
  }

  static function setLayout(layout : GosuWebLayout) {
    if(Response != null) {
      Response.Layouts.clear()
      if(layout != null) {
        Response.Layouts.push(layout)
      }
    } else {
      GosuWebResponse.DefaultLayout = layout
    }
  }

  static function textInput(literal: PropertyReference, name: String = null, options: Map<String, String> = null) : String {
    return InputGenerator.textInput(literal, name ,options)
  }

  static function radioInput(literal: PropertyReference, name: String = null, options: Map<String, String> = null) : String {
    return InputGenerator.radioInput(literal,name,options)
  }

  static function selectInput(literal: PropertyReference, name: String = null, options: Map<String, String> = null) : String {
    return InputGenerator.selectInput(literal, name, options)
  }

  static function labelInput(literal: PropertyReference, name: String = null) : String {
    return InputGenerator.labelInput(literal, name)
  }

  static function submitInput(text: String = 'Submit', options: Map<String, String> = null) : String {
    return InputGenerator.submitInput(text,options)
  }

}