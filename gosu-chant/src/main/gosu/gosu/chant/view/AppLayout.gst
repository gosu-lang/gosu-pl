<%@ extends gosu.web.GosuWebTemplate %>

<%@ params( content: String ) %>

<html>
  <head>
    <!-- libraries -->
    <link rel="stylesheet" href="/bootstrap-3.3.7-dist/css/bootstrap.css">

    <script src="/jquery-3.1.1.js"></script>
    <script src="/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
    <script src="/intercooler-1.0.2.js"></script>

    <!-- app -->
    <link rel="stylesheet" href="/bootstrap-3.3.7-dist/css/bootstrap.css">
    <script src="/application.js"></script>
  </head>
  <body>

    <body>

      <nav class="navbar navbar-inverse">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">GosuChat</a>
          </div>
        </div>
      </nav>

      <div class="container">
        ${content}
      </div><!-- /.container -->
  </body>
</html>
