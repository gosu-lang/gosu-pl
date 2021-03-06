package gosu.js.plugin;

import gw.fs.IFile;
import gw.lang.reflect.ITypeInfo;
import gosu.js.parser.tree.template.JSTNode;

public class JavascriptTemplateType extends JavascriptTypeBase
{
  private final JavascriptTemplateTypeInfo _typeinfo;

  public JavascriptTemplateType(JavascriptPlugin typeloader, String name, IFile jsFile, JSTNode templateNode)
  {
    super( typeloader, name, jsFile );
    _typeinfo = new JavascriptTemplateTypeInfo(this, templateNode);
  }

  @Override
  public ITypeInfo getTypeInfo()
  {
    return _typeinfo;
  }
}
