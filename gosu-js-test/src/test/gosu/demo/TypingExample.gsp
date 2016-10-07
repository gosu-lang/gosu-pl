
uses demo.javascript.TypingEx;

var typeexample = new TypingEx();

//Take in and return double
print( typeexample.returnsDouble(5.0) );


//Type coercion section
var shouldBeString = typeexample.doubleToStringReturnCoercionTest(5.0, 6.0);

if(shouldBeString typeis String) {
    print("Succesfully converted to string");
} else {
    print("Failed to be converted to string");
}


//Failure, attempts to return double but instead returns string
//typeexample.returnsWrongType("hello");