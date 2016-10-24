uses gosu.chant.view.*
uses java.io.File

extends gosu.web.GosuWebFile

// Set the working directory to the resources directory when running
StaticFiles = "/public"

Layout = AppLayout

get('/', \-> Chat.renderToString() )

post('/msg', \-> {
  print(Request.Params['msg'])
  return Chatbox.renderToString()
})