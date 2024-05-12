package app.back.springtemplate.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Integer id;

  @Column(name = "nickname", nullable = false)
  String nickname;

  @Column(name = "username", nullable = false)
  String username;

  @Column(name = "email", unique = true, nullable = false)
  String email;

  @Column(name = "password", unique = true, nullable = false)
  String password;

  @Column(name = "age", nullable = false)
  int age;

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
  public User(Integer id, String nickname, String username, String email, String password, int age) {
    this.id = id;
    this.nickname = nickname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.age = age;
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

}
