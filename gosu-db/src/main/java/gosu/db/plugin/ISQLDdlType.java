package gosu.db.plugin;

import gw.lang.parser.IHasInnerClass;

import gosu.db.parser.ast.CreateTable;

import java.util.List;

public interface ISQLDdlType extends IHasInnerClass, ISQLTypeBase {
  List<CreateTable> getTables();
  List<? extends ISQLTableType> getTableTypes();
}
