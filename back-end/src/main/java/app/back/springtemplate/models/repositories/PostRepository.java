package app.back.springtemplate.models.repositories;

import app.back.springtemplate.models.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Post repository.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Integer>{
}
