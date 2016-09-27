package gosu.db.parser;

public class SQLParseError extends RuntimeException {
  public SQLParseError(String message) {
    super(message);
  }
}
