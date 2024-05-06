package com.goHome.houseRentingPlatform.controller;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;
import com.goHome.houseRentingPlatform.service.ArticleService;
import com.goHome.houseRentingPlatform.service.CommentService;
@RestController
public class ArticleController {

    private final ArticleService articleService;
     private final CommentService commentService;

    public ArticleController(ArticleService articleService, CommentService commentService) {
        this.articleService = articleService;
        this.commentService = commentService;
    }

    @GetMapping("/articles/filter")
    public List<Article> getFilteredArticles(@RequestParam ArticleType type) {
        return articleService.getArticlesByType(type);
    }

    @GetMapping("/articles/rating")
    public List<Article> getArticlesByRating(@RequestParam Double minRate, @RequestParam Double maxRate) {
        return articleService.getArticlesByRatingRange(minRate, maxRate);
    }

    @GetMapping("/articles/sorted/newest")
    public Page<Article> getArticlesByNewest(@RequestParam int page, @RequestParam int size) {
        return articleService.getArticlesSortedByNewest(page, size);
    }

    @GetMapping("/articles/sorted/most-comments")
    public Page<Article> getArticlesByMostComments(@RequestParam int page, @RequestParam int size) {
        return articleService.getArticlesSortedByMostComments(page, size);
    }

    @GetMapping("/articles/sorted/highest-rating")
    public Page<Article> getArticlesByHighestRating(@RequestParam int page, @RequestParam int size) {
        return articleService.getArticlesSortedByHighestRating(page, size);
    }

    @GetMapping("/articles/sorted/most-favorites")
    public Page<Article> getArticlesByMostFavorites(@RequestParam int page, @RequestParam int size) {
        return articleService.getArticlesSortedByMostFavorites(page, size);
    }
    
    @PostMapping("/articles/{articleId}/comments")
    public void addComment(@PathVariable Long articleId,
                           @RequestParam Long userId,
                           @RequestParam String content) {
        commentService.addComment(articleId, userId, content);
    }
}
