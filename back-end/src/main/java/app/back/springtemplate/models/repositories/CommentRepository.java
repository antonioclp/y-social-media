package app.back.springtemplate.models.repositories;

import app.back.springtemplate.models.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Comment repository.
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
