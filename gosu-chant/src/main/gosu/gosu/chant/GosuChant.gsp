uses gosu.chant.model.*
uses gosu.chant.view.*

extends gosu.web.GosuWebFile

// Set the working directory to the resources directory when running
StaticFiles = "/public"

Layout = AppLayout

var chatRoom = new ChatRoom()

//------------------------------------------------------------
// Login Logic (To be generalized and pulled up
//------------------------------------------------------------
handle('/login', \->{
  if( Request.IsGet ) {
    return Login.renderToString() 
  } else if( Request.IsPost ) {
    if( LogIn(Params) ){
      Response.SparkJavaResponse.header('X-IC-Redirect', "/")
      return raw("") // TODO nothing() ?
    } else {
      return raw( Login.renderToString() )
    }
  }
})

//------------------------------------------------------------
// Chat Room
//------------------------------------------------------------
// TODO extract auth filter (gosu-auth)
using( beforeFilter( \ r, p -> { if(CurrentUser == null) Response.redirect( '/login' )  } ) ) {

  get('/', \-> Chat.renderToString(chatRoom))

  get('/msgs', \-> {
    return raw( Messages.renderToString(chatRoom.Messages) )
  })

  post('/msgs', \-> {
    chatRoom.addMessage( CurrentUser, Params['msg'] )
    return raw( Chatbox.renderToString(chatRoom) )
  })
    
}