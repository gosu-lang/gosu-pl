<%@ params( room : gosu.chant.model.ChatRoom ) %>

<h3>Le Chat Room de Autistés</h3>

<div ic-poll='1s' ic-src="/msgs">
  ${Messages.renderToString(room.Messages)}
</div>

<div id='posting-div'>
  <form ic-post-to="/msgs">
    ${Chatbox.renderToString(room)}
  </form>
</div>