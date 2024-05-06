package com.goHome.houseRentingPlatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goHome.houseRentingPlatform.model.Article;


public interface ArticleRepository extends JpaRepository<Article, Long> {
}

