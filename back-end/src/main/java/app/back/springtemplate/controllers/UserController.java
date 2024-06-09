package app.back.springtemplate.controllers;

import app.back.springtemplate.controllers.dtos.ReadUserDto;
import app.back.springtemplate.controllers.dtos.ResponseDto;
import app.back.springtemplate.controllers.dtos.UserDto;
import app.back.springtemplate.models.entity.User;
import app.back.springtemplate.services.UserService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * User controller.
 */
@RestController
@RequestMapping("/")
public class UserController {
  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  /**
   * Method that connect with service and register a new user.
   * Request body user object @param user
   * Return a response entity @return
   */
  @PostMapping("/register/user")
  public ResponseEntity<ResponseDto<UserDto>> createUser(@RequestBody User user) {
    try {
      User newUser = userService.createUser(user);
      UserDto userDto = new UserDto(newUser.getUsername(), newUser.getNickname(), newUser.getEmail(),
          newUser.getPassword(), newUser.getBio());
      ResponseDto<UserDto> res = new ResponseDto<UserDto>("user registered sucessfully", 201, userDto);

      return ResponseEntity.status(res.status()).body(res);
    } catch (Exception e) {
      ResponseDto<UserDto> res = new ResponseDto<UserDto>(e.getMessage(), 409, null);

      return ResponseEntity.status(res.status()).body(res);
    }
  }

  /**
   * Method that connect with service and return a user information by email.
   * User email @param email
   * Return a user object @return
   */
  @PostMapping("/login/user")
  public ResponseEntity<ResponseDto<UserDto>> readUser(@RequestBody User user) {
    try {
      User userByEmail = userService.readUser(user.getEmail(), user.getPassword());
      UserDto userDto = new UserDto(userByEmail.getUsername(), userByEmail.getNickname(), userByEmail.getEmail(),
          userByEmail.getPassword(), userByEmail.getBio());
      ResponseDto<UserDto> res = new ResponseDto<UserDto>("user logged sucessfully.", 200, userDto);

      return ResponseEntity.status(res.status()).body(res);
    } catch (Exception e) {
      if (e.getMessage().equals("user not found.")) {
        ResponseDto<UserDto> res = new ResponseDto<UserDto>(e.getMessage(), 404, null);

        return ResponseEntity.status(res.status()).body(res);
      } else {
        ResponseDto<UserDto> res = new ResponseDto<UserDto>(e.getMessage(), 409, null);

        return ResponseEntity.status(res.status()).body(res);
      }
    }
  }

  /**
   * Method that connect with service and read all users registered.
   * Return a list of all users @return
   */
  @GetMapping("/users")
  public ResponseEntity<ResponseDto<List<ReadUserDto>>> readAllUsers() {
    try {
      List<User> users = userService.readAllUsers();
      List<ReadUserDto> readUsersDto = users.stream()
          .map(u -> new ReadUserDto(u.getUsername(), u.getNickname(), u.getBio()))
          .collect(Collectors.toList());
      ResponseDto<List<ReadUserDto>> res = new ResponseDto<List<ReadUserDto>>("all users founded sucessfully.", 200,
          readUsersDto);

      return ResponseEntity.status(HttpStatus.OK).body(res);
    } catch (Exception e) {
      ResponseDto<List<ReadUserDto>> res = new ResponseDto<List<ReadUserDto>>(e.getMessage(), 404, null);

      return ResponseEntity.status(res.status()).body(res);
    }
  }

  /**
   * Method that conect with service and update a user.
   * User object @param user
   * Return the informations updated @return
   */
  @PutMapping("/update/user")
  public ResponseEntity<ResponseDto<ReadUserDto>> updateUser(@RequestBody User user) {
    try {
      User updatedUser = userService.updateUser(user.getEmail(), user.getNickname(), user.getUsername(),
          user.getPassword(), user.getBio());
      ReadUserDto readUserDto = new ReadUserDto(updatedUser.getUsername(), updatedUser.getNickname(),
          updatedUser.getBio());
      ResponseDto<ReadUserDto> res = new ResponseDto<ReadUserDto>("updated sucessfully.", 200, readUserDto);

      return ResponseEntity.status(res.status()).body(res);
    } catch (Exception e) {
      ResponseDto<ReadUserDto> res = new ResponseDto<ReadUserDto>(e.getMessage(), 409, null);

      return ResponseEntity.status(res.status()).body(res);
    }
  }

  /**
   * Method that connect with service and delete a user account.
   * User object with email and password @param user
   * Return a deleted user @return
   */
  @DeleteMapping("/delete/user")
  public ResponseEntity<ResponseDto<UserDto>> deleteUser(@RequestBody User user) {
    try {
      User deletedUser = userService.deleteUser(user.getEmail(), user.getPassword());
      UserDto userDto = new UserDto(deletedUser.getUsername(), deletedUser.getNickname(), deletedUser.getEmail(),
          deletedUser.getPassword(), deletedUser.getBio());
      ResponseDto<UserDto> res = new ResponseDto<UserDto>("user deleted sucessfully", 200, userDto);

      return ResponseEntity.status(res.status()).body(res);
    } catch (Exception e) {
      ResponseDto<UserDto> res = new ResponseDto<UserDto>(e.getMessage(), 409, null);

      return ResponseEntity.status(res.status()).body(res);
    }
  }
}
