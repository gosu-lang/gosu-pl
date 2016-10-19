package gosu.web.util.inputhelper

uses java.util.Map
uses java.lang.NoSuchMethodException
uses gw.lang.reflect.IEnumType
uses java.lang.IllegalAccessException
uses com.google.gson.Gson

enhancement ObjectUpdaterEnhancement : java.lang.Object {

  function updateFrom(entries : Map<String, String>) {
    for (entry in entries.entrySet()) {
      var p = (typeof this).TypeInfo.getProperty(entry.Key)
      if (p == null) {
         throw new NoSuchMethodException()
      } else if (p.Writable && entry.Value.NotBlank) {
        if (p.FeatureType typeis IEnumType) {
          this[entry.Key] = p.FeatureType.getEnumValue(entry.Value)
        } else {
          this[entry.Key] = entry.Value
        }
      } else if (entry.Value.NotBlank) {
        throw new IllegalAccessException('Cannot access property ${entry.Key}')
      }
    }
  }

  function toJSON() : String {
    return new Gson().toJson(this)
  }

}
