package app.back.springtemplate.errors;

public class ExceptionNotFound extends Exception {
  public ExceptionNotFound(String error) {
    super(error);
  }
}
