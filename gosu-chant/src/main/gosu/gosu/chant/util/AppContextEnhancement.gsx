package gosu.chant.util

uses gosu.web.util.IHasRequestContext

enhancement AppContextEnhancement : IHasRequestContext 
{
  property get CurrentUser() : gosu.chant.model.Account {
    var user = this.Session[ 'current-user' ] as String
    if(user != null ) {
      return new(){:Name = user} 
    } else {
      return null
    }
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