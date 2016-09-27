package gosu.db.plugin;

import gw.lang.parser.IFileRepositoryBasedType;
import gw.lang.reflect.IType;
import gosu.db.parser.ast.CreateTable;

import java.util.List;

public interface ISQLTableType extends IType, IFileRepositoryBasedType
{

  CreateTable getTable();

  List<ColumnDefinition> getColumnDefinitions();

  void deleteAll( boolean confirm );
}
