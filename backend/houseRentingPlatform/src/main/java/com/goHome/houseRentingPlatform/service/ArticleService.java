package com.goHome.houseRentingPlatform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;
import com.goHome.houseRentingPlatform.repository.ArticleRepository;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

      // filter:根據tag
    public List<Article> getArticlesByType(ArticleType type) {
        return articleRepository.findByTag(type);
    }

    // filter:根據評分
    public List<Article> getArticlesByRatingRange(Double minRate, Double maxRate) {
        return articleRepository.findByRateBetween(minRate, maxRate); 
    }

    // sorting
    public Page<Article> getArticlesSortedByNewest(int page, int size) {
        return articleRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size));
    }

    public Page<Article> getArticlesSortedByMostComments(int page, int size) {
        return articleRepository.findAllByCommentCountDesc(PageRequest.of(page, size));
    }

    public Page<Article> getArticlesSortedByHighestRating(int page, int size) {
        return articleRepository.findAllByRateDesc(PageRequest.of(page, size, Sort.by("rate").descending()));
    }

    public Page<Article> getArticlesSortedByMostFavorites(int page, int size) {
        return articleRepository.findAllByFavoriteCountDesc(PageRequest.of(page, size));
    }

    // 新增文章
public Article addArticle(Article newArticle) {
    validateArticle(newArticle);
    return articleRepository.save(newArticle);
}

// 更新文章
public Article updateArticle(Long articleId, Article articleDetails) {
    validateArticle(articleDetails);
    Article article = articleRepository.findById(articleId)
        .orElseThrow(() -> new RuntimeException("Article not found with id " + articleId));

    article.setTitle(articleDetails.getTitle());
    article.setAddress(articleDetails.getAddress());
    article.setTag(articleDetails.getTag());
    article.setRate(articleDetails.getRate());
    article.setDescription(articleDetails.getDescription());

    return articleRepository.save(article);
}

// 分類文章：找室內與評價
private void validateArticle(Article article) {
    if (article.getTag() == ArticleType.HOUSE_REVIEW && article.getRate() == null) {
        throw new IllegalArgumentException("Rating must be provided for house review articles.");
    }
    if (article.getTag() == ArticleType.ROOMMATE_SEARCH && article.getRate() != null) {
        throw new IllegalArgumentException("Rating must not be provided for roommate search articles.");
    }
}

    public void deleteArticle(Long articleId) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new RuntimeException("Article not found with id " + articleId));
        articleRepository.delete(article);
    }

    

}
