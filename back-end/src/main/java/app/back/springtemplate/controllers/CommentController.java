package app.back.springtemplate.controllers;

import app.back.springtemplate.controllers.dtos.ReadComment;
import app.back.springtemplate.controllers.dtos.ReadPostDto;
import app.back.springtemplate.controllers.dtos.ReadUserDto;
import app.back.springtemplate.controllers.dtos.ResponseDto;
import app.back.springtemplate.models.entity.Comment;
import app.back.springtemplate.models.entity.Post;
import app.back.springtemplate.models.entity.User;
import app.back.springtemplate.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

  @PostMapping("/create/comment")
  public ResponseEntity<ResponseDto<ReadComment>> createComment(@RequestBody Comment comment) {
    try {
      Comment newComment = commentService.createComment(comment);

      Post post = newComment.getPost();
      User user = newComment.getUser();

      ReadUserDto readUserDto = new ReadUserDto(user.getUsername(), user.getNickname(), user.getBio());

      User postUser = post.getUser();

      ReadUserDto readPostUserDto = new ReadUserDto(postUser.getUsername(), postUser.getNickname(), postUser.getBio());
      ReadPostDto readPostDto = new ReadPostDto(post.getMessage(), post.getCreatedDate(), post.getCreatedTime(),
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
}
