package gosu.db.plugin;

import gw.lang.reflect.*;
import gosu.db.runtime.SQLConstraint;
import gosu.db.runtime.SQLMetadata;
import gosu.db.runtime.SQLQuery;
import gosu.db.runtime.SQLRecord;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by pjennings on 7/14/2015.
 */

public class SQLReverseReferencePropertyInfo extends PropertyInfoBase implements IPropertyInfo
{
  private String _tableName;
  private String _refColumnName;
  private String _idColumnName;
  private String _propName;
  private IType _propType;
  private IPropertyAccessor _accessor;
  private final ILocationInfo _location;

  protected SQLReverseReferencePropertyInfo(String refColumnName, String idColumnName, String foreignTableName, ISQLDdlType system, String propName, IType propertyType, ITypeInfo container, int offset, int length)
  {
    super( container );
    _propName = propName;
    _propType = propertyType;
    _refColumnName = refColumnName;
    _idColumnName = idColumnName;
    _accessor = new IPropertyAccessor()
    {
      @Override
      public Object getValue( Object obj )
      {
        //Finding foreign table
        ISQLTableType foreignTable = null;
        for(ISQLTableType t : system.getTableTypes()){
          if(t.getRelativeName().equals(foreignTableName)){
            foreignTable = t;
          }
        }



        Object ref = ((SQLRecord) obj).getRawValue(_refColumnName);
        List args = new ArrayList<>();
        args.add(ref);
        SQLQuery query =  new SQLQuery<SQLRecord>(new SQLMetadata(),foreignTable);
        return query.where(SQLConstraint.raw(_idColumnName + " = ? ", args));

        //Is making a new metadata ok?
        //return ((SQLRecord)obj).getRawValue( _columnName );
      }

      @Override
      public void setValue(Object ctx, Object value) {

      }

    };
    _location = new LocationInfo( offset, length, -1, -1, null );
  }


  @Override
  public boolean isReadable()
  {
    return true;
  }

  @Override
  public boolean isWritable( IType iType )
  {
    return false;
  }

  @Override
  public IPropertyAccessor getAccessor()
  {
    return _accessor;
  }

  @Override
  public List<IAnnotationInfo> getDeclaredAnnotations()
  {
    return Collections.emptyList();
  }

  @Override
  public String getName()
  {
    return _propName;
  }

  @Override
  public IType getFeatureType()
  {
    return _propType;
  }

  @Override
  public ILocationInfo getLocationInfo()
  {
    return _location;
  }
}
