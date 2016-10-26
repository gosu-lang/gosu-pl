package gosu.chant.util

uses gosu.web.GosuWebTemplate

class UserSupport {
  static property get CurrentUser() : gosu.chant.model.Account {
    var user = GosuWebTemplate.Session[ 'current-user' ] as String
    if(user != null ) {
      return new(){:Name = user} 
    } else {
      return null
    }
  }    
}