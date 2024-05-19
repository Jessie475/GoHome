package com.goHome.houseRentingPlatform.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.goHome.houseRentingPlatform.model.A_Comment;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<A_Comment, Long>{
    List<A_Comment> findByArticleId(Long articleId);
}
