package gosu.db.plugin;

import gw.fs.IFile;
import gw.lang.parser.IFileRepositoryBasedType;
import gw.lang.reflect.IType;
import gw.lang.reflect.module.IModule;
import gosu.db.parser.ast.SQL;

import java.io.IOException;
import java.io.Reader;


public interface ISQLTypeBase extends IType, IFileRepositoryBasedType {

  String getSqlSource() throws IOException;

  Reader getReader() throws IOException;

  String getTypeName( IModule module );

  SQL getParseTree();

  IFile getFile();
}
