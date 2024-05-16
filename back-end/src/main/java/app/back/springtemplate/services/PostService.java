package app.back.springtemplate.services;

import app.back.springtemplate.errors.ExceptionGeneric;
import app.back.springtemplate.models.entity.Post;
import app.back.springtemplate.models.entity.User;
import app.back.springtemplate.models.repositories.PostRepository;
import app.back.springtemplate.models.repositories.UserRepository;

import java.util.List;
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

  /**
   * Method that create a new post.
   * Post message and others informations @param post
   * Post object @return
   * 
   * @throws ExceptionGeneric
   */
  public Post createPost(Post post) throws ExceptionGeneric {
    Optional<User> optionalUser = userRepository.findUserByEmail(post.getUser().getEmail());

    if (!optionalUser.isPresent()) {
      throw new ExceptionGeneric("user not found.");
    }

    User user = optionalUser.get();
    post.setUser(user);

    return postRepository.save(post);
  }

   /**
   * Method that find all users posts.
   * Return a list of posts @return
   * 
   * @throws ExceptionGeneric
   */
  public List<Post> readAllPosts() throws ExceptionGeneric {
    List<Post> posts = postRepository.findAll();

    if (posts.isEmpty()) {
      throw new ExceptionGeneric("no posts founded.");
    }

    return posts;
  }
}
