/*
 * Copyright 2014 Guidewire Software, Inc.
 */

package gw.internal.xml.xsd.typeprovider;

import gw.lang.parser.IFileRepositoryBasedType;

public interface IXmlType extends IFileRepositoryBasedType
{
  IXmlTypeData getTypeData();
}
