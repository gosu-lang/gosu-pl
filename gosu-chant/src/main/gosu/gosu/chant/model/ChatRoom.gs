package gosu.chant.model

class ChatRoom {

  var _messages : List<ChatMessage> as Messages = {}

  function addMessage( account : Account, msg : String ) {
    if(msg?.HasContent) {
      _messages.add( new(){ :Who = account.Name, :Text = msg } ) 
    }
  }

}
