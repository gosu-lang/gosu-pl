<%@ extends gosu.web.GosuWebTemplate %>

<%@ params( room : gosu.chant.model.ChatRoom ) %>

  <div class="form-group">
    <label for="msg">
      Shitposting as <em>${CurrentUser.Name}</em>
    </label>
    <input type="text" class="form-control" id="msg" name="msg" autofocus>
  </div>

  <button type="submit" class="btn btn-default">Post</button>
