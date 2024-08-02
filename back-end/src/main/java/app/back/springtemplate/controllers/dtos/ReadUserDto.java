package app.back.springtemplate.controllers.dtos;

public record ReadUserDto(Integer userId, String username, String nickname, String bio) {
}
