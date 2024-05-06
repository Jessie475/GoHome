package com.goHome.houseRentingPlatform.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;


public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByTag(ArticleType tag);
}