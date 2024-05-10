package com.goHome.houseRentingPlatform.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByType(ArticleType type);

    List<Article> findByTypeAndRateBetween(ArticleType type, Double minRate, Double maxRate);

    Page<Article> findAllByOrderByCreatedAtDesc(Pageable pageable);

    List<Article> findByAddressAndType(String address, ArticleType tag);

    default Optional<Article> findById(Long id) {
        
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }


    @Query("SELECT a FROM Article a LEFT JOIN a.comments c GROUP BY a ORDER BY COUNT(c) DESC")
    Page<Article> findAllByCommentCountDesc(Pageable pageable);

    @Query("SELECT a FROM Article a WHERE a.address LIKE %:address%")
    List<Article> findByAddressContaining(@Param("address") String address);

}
