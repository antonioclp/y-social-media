package app.back.springtemplate.services;

import app.back.springtemplate.errors.ExceptionGeneric;
import app.back.springtemplate.models.entity.User;
import app.back.springtemplate.models.repositories.UserRepository;
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
