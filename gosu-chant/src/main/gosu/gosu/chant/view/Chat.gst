<%@ params( room : gosu.chant.model.ChatRoom ) %>

<h3>Le Chat Room de Autistés</h3>

<div id="messages-div" ic-poll='1s' ic-src="/msgs" ic-scroll-to-bottom="true">
  ${Messages.renderToString(room.Messages)}
</div>

<div id='posting-div'>
  <form ic-post-to="/msgs" autocomplete="off">
    ${Chatbox.renderToString(room)}
  </form>
</div>