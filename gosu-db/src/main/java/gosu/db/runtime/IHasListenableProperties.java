package gosu.db.runtime;

public interface IHasListenableProperties {

  void addListener(Object ctx, IListenerAction action);

  void fireListeners(Object ctx);

  void clearListeners(Object ctx);

  void clearAllListeners();

}
