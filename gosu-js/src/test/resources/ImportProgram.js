import gosu.js.ImportingJavaClassTest.JavaClass;
import gosu.js.GosuDemoClass;

function javaFoo() {
  return JavaClass.staticFoo();
}

function gosuFoo() {
  return GosuDemoClass.staticFoo();
}
