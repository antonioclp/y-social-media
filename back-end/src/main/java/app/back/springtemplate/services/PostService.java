package app.back.springtemplate.services;

import app.back.springtemplate.errors.ExceptionGeneric;
import app.back.springtemplate.models.entity.Post;
import app.back.springtemplate.models.entity.User;
import app.back.springtemplate.models.repositories.PostRepository;
import app.back.springtemplate.models.repositories.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Post service.
 */
@Service
public class PostService {
  private final PostRepository postRepository;
  private final UserRepository userRepository;

  @Autowired
  public PostService(PostRepository postRepository, UserRepository userRepository) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
  }

  public Post createPost(Post post) throws ExceptionGeneric {
    Optional<User> optionalUser = userRepository.findById(post.getUser().getId());

    if (!optionalUser.isPresent()) {
      throw new ExceptionGeneric("user not found.");
    }

    User user = optionalUser.get();
    post.setUser(user);

    return postRepository.save(post);
  }
}
