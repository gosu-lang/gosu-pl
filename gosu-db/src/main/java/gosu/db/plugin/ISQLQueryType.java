package gosu.db.plugin;

import gw.lang.reflect.IType;
import gosu.db.parser.ast.Statement;

import java.util.List;

public interface ISQLQueryType extends ISQLTypeBase {

  /**
   * On entire single tables, is able to get the table which is referenced.
   * Note that if the table cannot be found, null will be returned.
   * @param name name of the table
   * @return table for given name
   */
  public ISQLTableType getTable(String name);

  /**
   * On columns, returns the type of the column. If the column cannot be found, defaults to object.
   * @param name name of column
   * @param tableName name of table
   * @return column for given name/table combination
   */
  public IType getColumn(String name, String tableName);

  public SQLPlugin getPlugin();

  /**
   * Creates a query result type.
   * @param statement a statement
   * @param type the query type
   * @return results
   */
  public ISQLQueryResultType getResults(Statement statement, ISQLQueryType type);

  /**
   * Creates a query result type.
   * @param columns list of columns
   * @param statement a statement
   * @return results
   */
  public ISQLQueryResultType getResults( List<SQLColumnPropertyInfo> columns, Statement statement);

  /**
   * Gets column properties; used to handle multiple tables. Defaults to null.
   * @param colName name of column
   * @param tableName name of table
   * @return properties of column for given name/table combination
   */
  public SQLColumnPropertyInfo getColumnProperty(String colName, String tableName);

  public ISQLQueryResultType getResultType();

  public void setResultType(ISQLQueryResultType type);
}
