package app.back.springtemplate.controllers.dtos;

public record ResponseDto<T>(String message, int status, T data) {
}
