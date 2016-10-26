package gosu.chant.util

uses java.io.File

class EmoticonSupport {

  static var emojiMap : Map<String, String> = {}
  
  static function init() {
    var emoticonFile = new File("src/main/resources/public/emoticons")
    if(emoticonFile.exists() && emoticonFile.Directory) {
      for(file in emoticonFile.Children) {
        if(file.Extension == "gif" || file.Extension == "png"  || file.Extension == "jpeg"  || file.Extension == "jpg" ) {
          emojiMap[file.NameSansExtension] = "/emoticons/${file.Name}"
        }
      }   
    } else {
      print("No emoticons found at ${emoticonFile.AbsolutePath}")
    }
  }

  static function emoticize(str : String) : String {
   var returnStr = new StringBuilder(str.length)
   var i = 0;
   while(i < str.length) {
     var ch = str.charAt( i )
     if(ch == '(') {
       var tmpBuffer = new StringBuilder()
       i++
       while(i < str.length && Character.isAlphabetic( str.charAt( i ) )) {
         tmpBuffer.append( str.charAt(i) )
         i++
       }
       if(i < str.length && str.charAt(i) == ')') {
         var emoji = tmpBuffer.toString()
         if(emojiMap.containsKey( emoji )) {
           returnStr.append( "<img height='40px' src='${emojiMap[emoji]}'/>" )
         } else {
           returnStr.append( '(' )
           returnStr.append( tmpBuffer )
           returnStr.append( ')' )
         }
       } else {
         returnStr.append( '(' )
         returnStr.append( tmpBuffer )
         if(i < str.length) {         
           returnStr.append( str.charAt(i) )
         }
       }
     } else {
       returnStr.append( ch )  
     }
     i++;
   } 
   return returnStr.toString()
  }

}