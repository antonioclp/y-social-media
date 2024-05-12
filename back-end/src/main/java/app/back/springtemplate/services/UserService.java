package app.back.springtemplate.services;

import app.back.springtemplate.errors.ExceptionNotFound;
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

  public void createUser(User newUser) throws ExceptionNotFound {
    Optional<User> user = userRepository.findUserByEmail(newUser.getEmail());

    if (user.isPresent()) {
      throw new ExceptionNotFound("email already registered.");
    }

    userRepository.save(newUser);
  }
}
