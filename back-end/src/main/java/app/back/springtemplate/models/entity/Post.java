package app.back.springtemplate.models.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Post entity.
 */
@Entity
@Table(name = "posts")
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Integer id;

  @Column(name = "message", nullable = false)
  String message;

  @Column(name = "created_date", nullable = false)
  LocalDate createdDate;

  @Column(name = "created_time", nullable = false)
  LocalTime createdTime;

  @ManyToOne(fetch = FetchType.LAZY)
  User user;

  public Post() {
  }

  /**
   * Constructor.
   * Post id @param id
   * Post message @param message
   * Post created date @param createdDate
   * Post created time @param createdTime
   */
  public Post(Integer id, String message, LocalDate createdDate, LocalTime createdTime) {
    this.id = id;
    this.message = message;
    this.createdDate = createdDate;
    this.createdTime = createdTime;
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
}
