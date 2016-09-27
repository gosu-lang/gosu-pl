package gosu.web

uses java.io.Closeable

/**
 * Created by carson on 6/11/15.
 */
class CloseableBlock implements Closeable{

  var _blk : block()

  construct( blk: block() ){
    _blk = blk
  }

  override function close(){
    _blk()
  }
}