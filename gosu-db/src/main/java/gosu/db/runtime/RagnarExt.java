package gosu.db.runtime;

public class RagnarExt<T> extends SQLRecord
{
  protected T getSelf() {
    return (T) this;
  }
}