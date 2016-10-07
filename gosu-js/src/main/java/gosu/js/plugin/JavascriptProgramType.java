package gosu.js.plugin;

import gw.fs.IFile;
import gw.lang.reflect.ITypeInfo;
import gosu.js.parser.tree.ProgramNode;

public class JavascriptProgramType extends JavascriptTypeBase
{
  private final JavascriptProgramTypeInfo _typeinfo;

  public JavascriptProgramType(JavascriptPlugin typeloader, String name, IFile jsFile, ProgramNode programNode)
  {
    super( typeloader, name, jsFile );
    _typeinfo = new JavascriptProgramTypeInfo( this, programNode );
  }

  @Override
  public ITypeInfo getTypeInfo()
  {
    return _typeinfo;
  }
}
