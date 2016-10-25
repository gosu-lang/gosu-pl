<%@ params( messages : List<gosu.chant.model.ChatMessage> ) %>

<% for(m in messages) { %>
  <div>
    <span>${m.Who}</span>:  <span>${m.Text}</span>
  </div>
<% } %>
