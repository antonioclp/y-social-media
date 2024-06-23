package app.back.springtemplate.controllers.dtos;

public record UserDto(Integer userId, String username, String nickname, String email, String password, String bio) {
}
