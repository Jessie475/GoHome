package com.goHome.houseRentingPlatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.goHome.houseRentingPlatform.repository.ArticleRepository;
import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;
import com.goHome.houseRentingPlatform.service.ArticleService;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    //新增文章
    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        return ResponseEntity.ok(articleService.saveArticle(article));
    }

    //更新文章
    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article article) {
        return ResponseEntity.ok(articleService.updateArticle(id, article));
    }

    //刪除文章
    @DeleteMapping("/delete{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.ok().build();
    }

    //點特定文章
    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        Article article = articleService.getAllArticles().stream()
                .filter(a -> a.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Article not found!"));
        return ResponseEntity.ok(article);
    }

    @GetMapping("/filterType/{type}")
    public ResponseEntity<List<Article>> getArticlesByType(@PathVariable ArticleType type) {
        List<Article> articles = articleService.filterArticlesByType(type);
        return ResponseEntity.ok(articles);
    }

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Article>> searchArticlesByAddress(@RequestParam String address) {
        List<Article> articles = articleService.searchArticlesByAddress(address);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/filterbyRate")
    public ResponseEntity<List<Article>> filterArticlesByTypeAndRate(
            @RequestParam ArticleType type,
            @RequestParam(required = false, defaultValue = "1") Double minRate,
            @RequestParam(required = false, defaultValue = "5") Double maxRate) {
        List<Article> filteredArticles = articleService.filterArticlesByTypeAndRate(type, minRate, maxRate);
        return ResponseEntity.ok(filteredArticles);
    }

    @GetMapping("/sortbyTime")
    public ResponseEntity<Page<Article>> getSortedArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Article> articles = articleService.getArticlesSortedByNewest(page, size);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/sortbyComment")
    public ResponseEntity<Page<Article>> getArticlesSortedByComments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Article> articles = articleService.getArticlesSortedByCommentCount(page, size);
        return ResponseEntity.ok(articles);
    }
}

