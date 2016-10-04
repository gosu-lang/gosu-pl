package gosu.db.runtime;

public class GosuDBExt<T> extends SQLRecord
{
  protected T getSelf() {
    return (T) this;
  }
}