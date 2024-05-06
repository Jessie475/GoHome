package com.goHome.houseRentingPlatform.controller;
import java.util.List;

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

    @PostMapping("/articles/{articleId}/comments")
    public void addComment(@PathVariable Long articleId,
                           @RequestParam Long userId,
                           @RequestParam String content) {
        commentService.addComment(articleId, userId, content);
    }
}
