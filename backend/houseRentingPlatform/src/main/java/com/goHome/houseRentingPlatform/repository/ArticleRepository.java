package com.goHome.houseRentingPlatform.repository;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;


public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByTag(ArticleType tag);
    List<Article> findByRateBetween(Double minRate, Double maxRate);

    @Query("SELECT a FROM Article a ORDER BY a.createdAt DESC")
    Page<Article> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("SELECT a, count(c.id) as commentCount FROM Article a LEFT JOIN Comment c ON a.id = c.article.id GROUP BY a.id ORDER BY commentCount DESC")
    Page<Article> findAllByCommentCountDesc(Pageable pageable);

    @Query("SELECT a FROM Article a ORDER BY a.rate DESC")
    Page<Article> findAllByRateDesc(Pageable pageable);

    @Query("SELECT a, count(f.id) as favoriteCount FROM Article a LEFT JOIN Favorite f ON a.id = f.article.id GROUP BY a.id ORDER BY favoriteCount DESC")
    Page<Article> findAllByFavoriteCountDesc(Pageable pageable);
}