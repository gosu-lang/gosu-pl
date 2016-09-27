package gosu.db.plugin;

import gw.lang.parser.IFileRepositoryBasedType;
import gw.lang.reflect.MethodList;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by klu on 8/3/2015.
 */
public class SQLEmptyTypeInfo extends SQLBaseTypeInfo{


  public SQLEmptyTypeInfo(IFileRepositoryBasedType type) {
    super(type);
    _propertiesList = new ArrayList<>();
    _propertiesMap = new HashMap<>();
    _methodList = new MethodList();
    _constructorList = new ArrayList<>();
  }
}
