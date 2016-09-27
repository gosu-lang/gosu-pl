package gosu.web.util.metrics

uses java.lang.Double

enhancement SnapshotEnhancement : com.codahale.metrics.Snapshot {

  function quartileRange() : List<List<Double>> {
    var quartiles : List<List<Double>> = {}
    for (i in 0..|4) {
      quartiles.add({this.getValue(0.25*i)/(1e9), this.getValue(0.25*(i+1))/(1e9)})
    }
    return quartiles
  }

}
