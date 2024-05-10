package com.goHome.houseRentingPlatform.repository;
import java.util.List;

import com.goHome.houseRentingPlatform.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import com.goHome.houseRentingPlatform.model.Comment;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
    List<Comment> findByArticleId(Long articleId);
}
