package gosu.chant.model
uses gosu.chant.util.EmoticonSupport

class ChatRoom {

  var _messages : List<ChatMessage> as Messages = {}

  function addMessage( account : Account, msg : String ) {
    if(msg?.HasContent) {
      _messages.add( new(){ :Who = account.Name, :Text = EmoticonSupport.emoticize( msg ) } ) 
    }
  }

}
