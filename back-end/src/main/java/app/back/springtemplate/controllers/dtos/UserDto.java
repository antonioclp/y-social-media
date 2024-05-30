package app.back.springtemplate.controllers.dtos;

public record UserDto(String username, String nickname, String email, String password, String bio) {
}
