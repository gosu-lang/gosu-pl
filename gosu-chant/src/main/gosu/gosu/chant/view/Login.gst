<%@ extends gosu.web.GosuWebTemplate %>
<form ic-post-to="/login">
  <div class="form-group">
    <label for="username">User Name</label>
    <input type="text" class="form-control" name="username" placeholder="Enter A Username" value="${Params['username'] ?: ''}">
  </div>
  <div class="form-group">
    <label for="username">Access Code</label>
    <input type="password" class="form-control" name="access" placeholder="Access Code" value="${Params['access'] ?: ''}">
  </div>
  <button>Log In</button>
</form>