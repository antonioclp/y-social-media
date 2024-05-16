package app.back.springtemplate.controllers;

import app.back.springtemplate.controllers.dtos.ReadPostDto;
import app.back.springtemplate.controllers.dtos.ReadUserDto;
import app.back.springtemplate.controllers.dtos.ResponseDto;
import app.back.springtemplate.models.entity.Post;
import app.back.springtemplate.models.entity.User;
import app.back.springtemplate.services.PostService;
import app.back.springtemplate.services.UserService;

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

  /**
   * Method that connect with service and create a new post.
   * Post message and others informations @param post
   * Return a post object @return
   */
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

  /**
   * Method that connect with service and return all users posts.
   * Return a list of posts @return
   */
  @GetMapping("/posts")
  public ResponseEntity<ResponseDto<List<ReadPostDto>>> readAllPosts() {
    try {
      List<Post> posts = postService.readAllPosts();
      List<ReadPostDto> readPostsDto = posts.stream()
          .map(p -> new ReadPostDto(p.getMessage(), p.getCreatedDate(), p.getCreatedTime(),
              new ReadUserDto(p.getUser().getUsername(), p.getUser().getNickname())))
          .collect(Collectors.toList());

      ResponseDto<List<ReadPostDto>> res = new ResponseDto<List<ReadPostDto>>("success", 200, readPostsDto);
      return ResponseEntity.status(res.status()).body(res);
    } catch (Exception e) {
      ResponseDto<List<ReadPostDto>> res = new ResponseDto<List<ReadPostDto>>(e.getMessage(), 404, null);

      return ResponseEntity.status(res.status()).body(res);
    }
  }

  /**
   * Method that connect with service and return all posts by user nickname.
   * User nickname @param nickname
   * All posts by user @return
   */
  @GetMapping("/posts/{nickname}")
  public ResponseEntity<ResponseDto<List<ReadPostDto>>> readPostsByUserNickname(@PathVariable String nickname) {
    try {
      List<Post> postsByUserNickname = postService.readPostsByUserNickname(nickname);
      List<ReadPostDto> readPostsDto = postsByUserNickname.stream()
          .map(p -> new ReadPostDto(p.getMessage(), p.getCreatedDate(), p.getCreatedTime(),
              new ReadUserDto(p.getUser().getUsername(), p.getUser().getNickname())))
          .collect(Collectors.toList());

      ResponseDto<List<ReadPostDto>> res = new ResponseDto<List<ReadPostDto>>("sucess", 200, readPostsDto);

      return ResponseEntity.status(res.status()).body(res);
    } catch (Exception e) {
      ResponseDto<List<ReadPostDto>> res = new ResponseDto<List<ReadPostDto>>(e.getMessage(), 404, null);

      return ResponseEntity.status(res.status()).body(res);
    }
  }
}
