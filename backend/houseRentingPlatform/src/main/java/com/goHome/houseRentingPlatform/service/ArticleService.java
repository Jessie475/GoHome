package com.goHome.houseRentingPlatform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    public List<Article> getArticlesByType(ArticleType type) {
        return articleRepository.findByTag(type);
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
