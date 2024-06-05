package com.goHome.houseRentingPlatform.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.goHome.houseRentingPlatform.model.A_Comment;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface A_CommentRepository extends JpaRepository<A_Comment, Long>{
    List<A_Comment> findByArticleId(Long articleId);

    List<A_Comment> findByUser_UserId(Integer userId);
    Optional<A_Comment> findById(Integer id);
    

    void deleteById(Integer id);
}
