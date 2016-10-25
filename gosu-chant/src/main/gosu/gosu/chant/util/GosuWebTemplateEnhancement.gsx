package gosu.chant.util

uses gosu.web.util.IHasRequestContext

uses gosu.web.GosuWebTemplate

enhancement GosuWebTemplateEnhancement : GosuWebTemplate
{
  // TODO we have to duplicate this logic because of the static context of templates.... why?
  static property get CurrentUser() : gosu.chant.model.Account {
    var user = GosuWebTemplate.Session[ 'current-user' ] as String
    if(user != null ) {
      return new(){:Name = user} 
    } else {
      return null
    }
  }
}