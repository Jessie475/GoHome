package com.goHome.houseRentingPlatform.controller;

import java.util.List;

import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.repository.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.goHome.houseRentingPlatform.model.User;
import com.goHome.houseRentingPlatform.service.ArticleService;
import com.goHome.houseRentingPlatform.service.UserService;

@RestController
@RequestMapping("/articles")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticleController {

    @Autowired
    private ArticleService articleService;
    @Autowired
    private ArticleRepository ArticleRepository;
    @Autowired
    private UserService userService;

    //新增文章
    @PostMapping("/addArticle")
    public String createArticle(@RequestBody Article article,@RequestParam Integer userId) {
        articleService.saveArticle(article,userId);
        return  "New house is added";
    }

    //更新文章
    @PutMapping("/Update/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article article) {
        return ResponseEntity.ok(articleService.updateArticle(id, article));
    }

    //刪除文章
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getArticle/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        Article article = articleService.findArticleById(id)
            .orElseThrow(() -> new RuntimeException("Article not found!"));
        return ResponseEntity.ok(article);
    }

    @GetMapping("/filterType/{type}")
    public ResponseEntity<List<Article>> getArticlesByType(@PathVariable ArticleType type) {
        List<Article> articles = articleService.filterArticlesByType(type);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/getAllArticle")
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Article>> searchArticlesByAddress(@RequestParam String address) {
        List<Article> articles = articleService.searchArticlesByAddress(address);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/filterByRate")
    public ResponseEntity<List<Article>> filterArticlesByTypeAndRate(
            @RequestParam ArticleType type,
            @RequestParam(required = false, defaultValue = "1") Double minRate,
            @RequestParam(required = false, defaultValue = "5") Double maxRate) {
        List<Article> filteredArticles = articleService.filterArticlesByTypeAndRate(type, minRate, maxRate);
        return ResponseEntity.ok(filteredArticles);
    }

    @GetMapping("/sortByTime")
    public ResponseEntity<Page<Article>> getSortedArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Article> articles = articleService.getArticlesSortedByNewest(page, size);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/sortByComment")
    public ResponseEntity<Page<Article>> getArticlesSortedByComments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Article> articles = articleService.getArticlesSortedByCommentCount(page, size);
        return ResponseEntity.ok(articles);
    }

 

    // 添加收藏功能
    @PostMapping("/favorite/{articleId}")
    public ResponseEntity<Void> addFavoriteArticle(@PathVariable Long articleId, @RequestParam Integer userId) {
        User user = userService.getUserById(userId);
        userService.addFavArticleToUser(user, articleId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/favorite/{articleId}")
    public ResponseEntity<Void> removeFavoriteArticle(@PathVariable Long articleId, @RequestParam Integer userId) {
        User user = userService.getUserById(userId);
        userService.removeFavArticleFromUser(user, articleId);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/updateLatLng/{id}")
    public ResponseEntity<Article> updateLatLng(@PathVariable("id") Long id, @RequestBody House articleDetails) {
        Article Article = ArticleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found!"));
        Article.setLat(articleDetails.getLat());
        Article.setLng(articleDetails.getLng());
        ArticleRepository.save(Article);
        return ResponseEntity.ok(Article);
    }



}

