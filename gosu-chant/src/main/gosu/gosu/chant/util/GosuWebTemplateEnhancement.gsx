package gosu.chant.util

uses gosu.web.GosuWebTemplate

enhancement GosuWebTemplateEnhancement : GosuWebTemplate
{
  // TODO we have to duplicate this logic because of the static context of templates.... why?
  static property get CurrentUser() : gosu.chant.model.Account {
    return UserSupport.CurrentUser
  }
}