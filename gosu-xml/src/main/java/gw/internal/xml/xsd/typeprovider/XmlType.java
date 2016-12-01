/*
 * Copyright 2014 Guidewire Software, Inc.
 */

package gw.internal.xml.xsd.typeprovider;

import gw.fs.IFile;
import gw.lang.reflect.*;
import gw.lang.reflect.gs.ClassType;
import gw.lang.reflect.gs.ISourceFileHandle;
import gw.lang.reflect.java.IJavaBackedType;
import gw.lang.reflect.java.IJavaClassInfo;
import gw.util.GosuClassUtil;

import java.net.URL;
import java.util.List;

import static gw.config.CommonServices.getFileSystem;

public class XmlType extends TypeBase implements IXmlType, IEnhanceableType, IJavaBackedType {

  private final ITypeLoader _typeLoader;
  private final IXmlTypeData _typeData;
  private ISourceFileHandle _fileHandle;

  public XmlType(ITypeLoader typeLoader, IXmlTypeData typeData) {
    _typeLoader = typeLoader;
    _typeData = typeData;
  }

  @Override
  public String getName() {
    return _typeData.getName();
  }

  @Override
  public String getRelativeName() {
    return GosuClassUtil.getNameNoPackage( _typeData.getName() );
  }

  @Override
  public String getNamespace() {
    return GosuClassUtil.getPackage( _typeData.getName() );
  }

  @Override
  public ITypeLoader getTypeLoader() {
    return _typeLoader;
  }

  @Override
  public IType getSupertype() {
    return _typeData.getSuperType();
  }

  @Override
  public IType[] getInterfaces() {
    List<? extends IType> interfaces = _typeData.getInterfaces();
    return interfaces.toArray(new IType[interfaces.size()]);
  }

  @Override
  public ITypeInfo getTypeInfo() {
    return _typeData;
  }

  @Override
  public String toString() {
    return _typeData.getName();
  }

  @Override
  public IXmlTypeData getTypeData() {
    return _typeData;
  }

  @Override
  public boolean isEnum() {
    return _typeData.isEnum();
  }

  @Override
  public boolean isFinal() {
    return _typeData.isFinal();
  }

  @Override
  public IJavaClassInfo getBackingClassInfo() {
    return _typeData.getBackingClassInfo();
  }

  @Override
  public Class getBackingClass() {
    return _typeData.getBackingClass();
  }

  @Override
  protected IJavaClassInfo getArrayComponentClass() {
    return getBackingClassInfo();
  }

  @Override
  public IType getTypeFromJavaBackedType() {
    return TypeSystem.getTypeFromJavaBasedType(this);
  }

  @Override
  public IFile[] getSourceFiles() {
    URL schemaURL = _typeData.getSchemaIndex().getSchemaURL();
    if (schemaURL != null) {
      return new IFile[]{getFileSystem().getIFile(schemaURL)};
    }
    return IFile.EMPTY_ARRAY;
  }

  @Override
  public ISourceFileHandle getSourceFileHandle()
  {
    if( _fileHandle == null )
    {
      IDefaultTypeLoader loader = _typeLoader.getModule().getTypeLoaders( IDefaultTypeLoader.class ).get( 0 );
      _fileHandle = loader.getSouceFileHandle( getName() );
    }
    return _fileHandle;
  }

  @Override
  public ClassType getClassType()
  {
    return ClassType.Unknown;
  }
}
