package app.back.springtemplate.models.repositories;

import app.back.springtemplate.models.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * User repository.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findUserByEmail(String email);
}
