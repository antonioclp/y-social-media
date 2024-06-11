package app.back.springtemplate.controllers;

import app.back.springtemplate.controllers.dtos.ReadComment;
import app.back.springtemplate.controllers.dtos.ReadPostDto;
import app.back.springtemplate.controllers.dtos.ReadUserDto;
import app.back.springtemplate.controllers.dtos.ResponseDto;
import app.back.springtemplate.models.entity.Comment;
import app.back.springtemplate.models.entity.Post;
import app.back.springtemplate.models.entity.User;
import app.back.springtemplate.services.CommentService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Comment controller.
 */
@RestController
@RequestMapping("/")
public class CommentController {
  private final CommentService commentService;

  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  /**
   * Method that connect with service and create a new comment in post
   * Comment message and others informations @param comment
   * Return a comment obj @return
   */
  @PostMapping("/create/comment")
  public ResponseEntity<ResponseDto<ReadComment>> createComment(@RequestBody Comment comment) {
    try {
      Comment newComment = commentService.createComment(comment);

      Post post = newComment.getPost();
      User user = newComment.getUser();

      ReadUserDto readUserDto = new ReadUserDto(user.getUsername(), user.getNickname(), user.getBio());

      User postUser = post.getUser();

      ReadUserDto readPostUserDto = new ReadUserDto(postUser.getUsername(), postUser.getNickname(), postUser.getBio());
      ReadPostDto readPostDto = new ReadPostDto(post.getId(), post.getMessage(), post.getCreatedDate(),
          post.getCreatedTime(),
          readPostUserDto);

      ReadComment readComment = new ReadComment(newComment.getMessage(), newComment.getCreatedDate(),
          newComment.getCreatedTime(), readPostDto, readUserDto);

      ResponseDto<ReadComment> res = new ResponseDto<ReadComment>("created comment sucessfully", 201, readComment);

      return ResponseEntity.status(res.status()).body(res);
    } catch (Exception e) {
      ResponseDto<ReadComment> res = new ResponseDto<ReadComment>(e.getMessage(), 404, null);

      return ResponseEntity.status(res.status()).body(res);
    }
  }

  @GetMapping("/comments/post/{id}")
  public ResponseEntity<ResponseDto<List<ReadComment>>> readCommentsByPostId(@PathVariable Integer id) {
    try {
      List<Comment> comments = commentService.readCommentsByPostId(id);

      List<ReadComment> readComments = comments.stream()
          .map(c -> {
            ReadUserDto readUserDto = new ReadUserDto(
                c.getUser().getUsername(),
                c.getUser().getNickname(),
                c.getUser().getBio());

            ReadPostDto readPostDto = new ReadPostDto(
                c.getPost().getId(),
                c.getPost().getMessage(),
                c.getPost().getCreatedDate(),
                c.getPost().getCreatedTime(),
                new ReadUserDto(
                    c.getPost().getUser().getUsername(),
                    c.getPost().getUser().getNickname(),
                    c.getPost().getUser().getBio()));

            return new ReadComment(
                c.getMessage(),
                c.getCreatedDate(),
                c.getCreatedTime(),
                readPostDto,
                readUserDto);
          })
          .collect(Collectors.toList());

      ResponseDto<List<ReadComment>> res = new ResponseDto<List<ReadComment>>("retrevied comments sucessfully", 200,
          readComments);

      return ResponseEntity.status(res.status()).body(res);
    } catch (Exception e) {
      ResponseDto<List<ReadComment>> res = new ResponseDto<List<ReadComment>>(e.getMessage(), 404, null);

      return ResponseEntity.status(res.status()).body(res);
    }
  }
}
