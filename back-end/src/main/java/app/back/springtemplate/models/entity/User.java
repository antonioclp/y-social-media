package app.back.springtemplate.models.entity;

import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * User entity.
 */
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "nickname", unique = true, nullable = false)
  private String nickname;

  @Column(name = "username", nullable = false)
  private String username;

  @Column(name = "email", unique = true, nullable = false)
  private String email;

  @Column(name = "password", nullable = false)
  private String password;

  @Column(name = "age", nullable = false)
  private int age;

  @Column(name = "bio")
  private String bio;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Post> posts;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Comment> comments;

  public User() {
  }

  /**
   * Constructor.
   * User id @param id
   * User nickname @param nickname
   * Username @param username
   * User email @param email
   * User password @param password
   */
  public User(Integer id, String nickname, String username, String email, String password, int age, String bio) {
    this.id = id;
    this.nickname = nickname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.age = age;
    this.bio = bio;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public String getBio() {
    return bio;
  }

  public void setBio(String bio) {
    this.bio = bio;
  }

}
