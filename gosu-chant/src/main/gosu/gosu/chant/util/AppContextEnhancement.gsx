package gosu.chant.util

uses gosu.web.util.IHasRequestContext

enhancement AppContextEnhancement : IHasRequestContext 
{
  // TODO we have to duplicate this logic because of the static context of templates.... why?
  static property get CurrentUser() : gosu.chant.model.Account {
    return UserSupport.CurrentUser
  }

  static property get IsUserLoggedIn() : boolean {
    return CurrentUser != null
  }

  function LogIn( params: Map<String, String> ) : boolean {
     if(params['access'] == 'harambe') {
       this.Session[ 'current-user' ] = params['username']
       return true
     } else {
       return false
     }
  }
}