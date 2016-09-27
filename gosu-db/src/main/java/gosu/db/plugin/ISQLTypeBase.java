package gosu.db.plugin;

import gosu.db.parser.ast.SQL;
import gw.fs.IFile;
import gw.lang.parser.IFileRepositoryBasedType;
import gw.lang.reflect.IFileBasedFeature;
import gw.lang.reflect.IType;
import gw.lang.reflect.module.IModule;

import java.io.IOException;
import java.io.Reader;


public interface ISQLTypeBase extends IType, IFileRepositoryBasedType {

  String getSqlSource() throws IOException;

  Reader getReader() throws IOException;

  String getTypeName( IModule module );

  SQL getParseTree();

  IFile getFile();
}
