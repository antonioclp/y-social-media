package app.back.springtemplate.controllers;

import app.back.springtemplate.controllers.dtos.ReadPostDto;
import app.back.springtemplate.controllers.dtos.ReadUserDto;
import app.back.springtemplate.controllers.dtos.ResponseDto;
import app.back.springtemplate.models.entity.Post;
import app.back.springtemplate.models.entity.User;
import app.back.springtemplate.services.PostService;
import app.back.springtemplate.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class PostController {
  private final PostService postService;
  private final UserService userService;

  @Autowired
  public PostController(PostService postService, UserService userService) {
    this.postService = postService;
    this.userService = userService;
  }

  @PostMapping("/create/post")
  public ResponseEntity<ResponseDto<ReadPostDto>> createPost(@RequestBody Post post) {
    try {
      Post newPost = postService.createPost(post);
      User userById = userService.readUser(newPost.getUser().getEmail(), newPost.getUser().getPassword());

      ReadUserDto readUserDto = new ReadUserDto(userById.getUsername(), userById.getNickname());
      ReadPostDto readPostDto = new ReadPostDto(newPost.getMessage(), newPost.getCreatedDate(),
          newPost.getCreatedTime(), readUserDto);

      ResponseDto<ReadPostDto> res = new ResponseDto<ReadPostDto>("created post sucessfully", 201, readPostDto);

      return ResponseEntity.status(res.status()).body(res);
    } catch (Exception e) {
      ResponseDto<ReadPostDto> res = new ResponseDto<ReadPostDto>(e.getMessage(), 404, null);

      return ResponseEntity.status(res.status()).body(res);
    }
  }
}
