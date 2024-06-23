package app.back.springtemplate.models.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Comments entity.
 */
@Entity
@Table(name = "comments")
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "message", nullable = false)
  private String message;

  @Column(name = "created_date", nullable = false)
  private LocalDate createdDate;

  @Column(name = "created_time", nullable = false)
  private LocalTime createdTime;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id")
  private Post post;

  /**
   * Constructor.
   * Comment id @param id
   * Comment message @param message
   * Comment created date @param createdDate
   * Comment created time @param createdTime
   * Comment by user @param user
   * Comment in post @param post
   */
  public Comment(Integer id, String message, LocalDate createdDate, LocalTime createdTime, User user, Post post) {
    this.id = id;
    this.message = message;
    this.createdDate = createdDate;
    this.createdTime = createdTime;
    this.user = user;
    this.post = post;
  }

  public Comment() {
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public LocalDate getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(LocalDate createdDate) {
    this.createdDate = createdDate;
  }

  public LocalTime getCreatedTime() {
    return createdTime;
  }

  public void setCreatedTime(LocalTime createdTime) {
    this.createdTime = createdTime;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Post getPost() {
    return post;
  }

  public void setPost(Post post) {
    this.post = post;
  }
}
