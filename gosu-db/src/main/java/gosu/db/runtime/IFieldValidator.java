package gosu.db.runtime;

import gosu.db.runtime.validation.ValidationException;

public interface IFieldValidator<T>
{
  /**
   * @throws ValidationException - an exception if the value is not valid
   *
   * @param value to validate
   */
  void validateValue( T value ) throws ValidationException;
}
