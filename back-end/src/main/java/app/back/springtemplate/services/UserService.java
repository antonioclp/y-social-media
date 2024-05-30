package app.back.springtemplate.services;

import app.back.springtemplate.errors.ExceptionGeneric;
import app.back.springtemplate.models.entity.User;
import app.back.springtemplate.models.repositories.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Method that create and return a new user.
   * New user object @param newUser
   * Return a new user object @return
   * 
   * @throws ExceptionGeneric
   */
  public User createUser(User newUser) throws ExceptionGeneric {
    Optional<User> optionalUser = userRepository.findUserByEmail(newUser.getEmail());

    if (optionalUser.isPresent()) {
      throw new ExceptionGeneric("email already registered.");
    }

    return userRepository.save(newUser);
  }

  /**
   * Method that return a user informations by email.
   * User email @param email
   * User object by email @return
   * 
   * @throws ExceptionGeneric
   */
  public User readUser(String email, String password) throws ExceptionGeneric {
    Optional<User> optionalUser = userRepository.findUserByEmail(email);

    if (!optionalUser.isPresent()) {
      throw new ExceptionGeneric("user not found.");
    }

    User userByEmail = optionalUser.get();

    if (!password.equals(userByEmail.getPassword())) {
      throw new ExceptionGeneric("bad credentials");
    }

    return userByEmail;
  }

  /**
   * Method that find all registered users.
   * Return a list of users @return
   * 
   * @throws ExceptionGeneric
   */
  public List<User> readAllUsers() throws ExceptionGeneric {
    List<User> users = userRepository.findAll();

    if (users.isEmpty()) {
      throw new ExceptionGeneric("no registered users.");
    }

    return users;
  }

  /**
   * Method that update a existing user.
   * User email @param email
   * User nickname @param nickname
   * Username @param username
   * User password @param password
   * Updated user @return
   * 
   * @throws ExceptionGeneric
   */
  public User updateUser(String email, String nickname, String username, String password, String bio) throws ExceptionGeneric {
    Optional<User> optionalUser = userRepository.findUserByEmail(email);

    if (!optionalUser.isPresent()) {
      throw new ExceptionGeneric("user not found.");
    }

    User user = optionalUser.get();

    if (!password.equals(user.getPassword())) {
      throw new ExceptionGeneric("bad credentials");
    }

    if (nickname != null && !nickname.isBlank()) {
      user.setNickname(nickname);
    }

    if (username != null && !username.isBlank()) {
      user.setUsername(username);
    }

    if (bio != null) {
      user.setBio(bio);
    }

    return userRepository.save(user);
  }

  /**
   * Method that delete a user account.
   * User email @param email
   * User password @param password
   * Deleted user @return
   * 
   * @throws ExceptionGeneric
   */
  public User deleteUser(String email, String password) throws ExceptionGeneric {
    Optional<User> optionalUser = userRepository.findUserByEmail(email);

    if (!optionalUser.isPresent()) {
      throw new ExceptionGeneric("user not found.");
    }

    if (!optionalUser.get().getPassword().equals(password)) {
      throw new ExceptionGeneric("bad credentials");
    }

    User user = optionalUser.get();
    userRepository.delete(user);

    return user;
  }
}
