package app.back.springtemplate.services;

import app.back.springtemplate.errors.ExceptionGeneric;
import app.back.springtemplate.models.entity.Comment;
import app.back.springtemplate.models.entity.Post;
import app.back.springtemplate.models.entity.User;
import app.back.springtemplate.models.repositories.CommentRepository;
import app.back.springtemplate.models.repositories.PostRepository;
import app.back.springtemplate.models.repositories.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Comments service.
 */
@Service
public class CommentService {
  private final CommentRepository commentRepository;
  private final PostRepository postRepository;
  private final UserRepository userRepository;

  @Autowired
  public CommentService(CommentRepository commentRepository, PostRepository postRepository,
      UserRepository userRepository) {
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
    this.userRepository = userRepository;
  }

  /**
   * Method that creates a new comment.
   * Comment message @param comment
   * Comment obj @return
   * 
   * @throws ExceptionGeneric
   */
  public Comment createComment(Comment comment) throws ExceptionGeneric {
    Optional<Post> optionalPost = postRepository.findById(comment.getPost().getId());
    Optional<User> optionalUser = userRepository.findById(comment.getUser().getId());

    if (!optionalPost.isPresent()) {
      throw new ExceptionGeneric("post doesn't exists.");
    }

    if (!optionalUser.isPresent()) {
      throw new ExceptionGeneric("user doesn't exists.");
    }

    Post post = optionalPost.get();
    User user = optionalUser.get();

    comment.setPost(post);
    comment.setUser(user);

    return commentRepository.save(comment);
  }
}
