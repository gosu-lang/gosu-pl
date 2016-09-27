<h1>Hello World</h1>

<p>This is great!!!!</p>

<h3>Wow</h3>

<p>This is great!!!!</p>

<hr/>

<form action="post_to" method="post">
  <input type="text" name="foo"/>
  <button>Submit</button>
</form>

<form action="/handle" method="post">
  <button>Post To Handle</button>
</form>

<table class="table">
<% for(i in 1..2000) {  %>
	<tr>
      <td>Number: ${i}</td>
      <td>Foo</td>
      <td>Bar</td>
    </tr>
<% } %>
</table>
