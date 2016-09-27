package gosu.web.util

uses gw.lang.reflect.*
uses gw.config.*
uses gw.lang.parser.exceptions.IncompatibleTypeException
uses java.lang.*
uses java.util.*

class ParamConverter {

  static function populateArgs(requestValues: Map<String, String>, params : IParameterInfo[]) : Object[] {
    var result = new Object[params.length]
    for(p in params index i) {
      try {
        result[i] = ParamConverter.convertValue(p.FeatureType, requestValues[p.DisplayName])
      } catch(e) {
        throw "Bad value for param #{p.DisplayName} of type ${p.FeatureType.DisplayName} : ${requestValues[p.DisplayName]}"
      }
    }
    return result;
  }

  static function convertValue(paramType : IType, paramValue : String) : Object {
    if (paramType == boolean) {
      return "on".equals(paramValue) or "true".equals(paramValue)
    }
    if(not paramValue?.HasContent) {
      if(not paramType.Primitive) {
        return null
      } else {

      }
    }
    var factoryMethod = getFactoryMethod(paramType)
    if(factoryMethod != null) {
      return factoryMethod.CallHandler.handleCall(null, {convertValue(factoryMethod.Parameters[0].FeatureType, paramValue)})
    } else {
      switch(paramType) {
        case int:
        case Integer:
            return Integer.parseInt(paramValue)
        case long:
        case Long:
            return Long.parseLong(paramValue)
        case float:
        case Float:
            return Float.parseFloat(paramValue)
        case double:
        case Double:
            return Double.parseDouble(paramValue)
        case Date:
            return new Date(paramValue)
          default:
          try {
            return CommonServices.getCoercionManager().convertValue(paramValue, paramType)
          } catch (ex : IncompatibleTypeException ) {
            if(paramType?.Primitive || paramType?.Namespace?.startsWith('java')) {
              throw ex
            } else {
              throw  new IncompatibleTypeException("Did you expect a static fromId() method on ${paramType.Name}?", ex)
            }
          }
      }
    }
  }

  static function getFactoryMethod(type : IType) : IMethodInfo {
    for(var method in type.TypeInfo.Methods) {
      if(method.Static and method.DisplayName == "fromId" and method.ReturnType.Name == type.Name and method.Parameters.Count == 1) {
        return method
      }
    }
    return null
  }
}