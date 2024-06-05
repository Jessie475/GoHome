package com.goHome.houseRentingPlatform.controller;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.web.multipart.MultipartFile;

import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;
import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.model.User;
import com.goHome.houseRentingPlatform.repository.ArticleRepository;
import com.goHome.houseRentingPlatform.service.ArticleService;
import com.goHome.houseRentingPlatform.service.UserService;

@RestController
@RequestMapping("/article")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticleController {

    @Autowired
    private ArticleService articleService;
    @Autowired
    private ArticleRepository ArticleRepository;
    @Autowired
    private UserService userService;
private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);

    //新增文章
    @PostMapping("/addArticle")
    public ResponseEntity<Article> addArticle(
            @RequestParam("title") String title,
            @RequestParam("address") String address,
            @RequestParam("description") String description,
            @RequestParam("type") ArticleType type,
            @RequestParam("userId") Integer userId,
            @RequestParam(value = "rate", required = false) Double rate,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            User user = userService.getUserById(userId);
            if (user == null) {
                return ResponseEntity.badRequest().build();
            }

            Article article = new Article();
            article.setTitle(title);
            article.setAddress(address);
            article.setDescription(description);
            article.setType(type);
            article.setCreatedAt(new Date());
            article.setUser(user); // 关联 User 对象

            // 如果文章类型是HOUSE_REVIEW则设置评分
            if (type == ArticleType.HOUSE_REVIEW) {
                article.setRate(rate);
            }

            // 如果有图片则设置图片
           // 保存图片到本地文件系统
           if (image != null && !image.isEmpty()) {
            String fileName = image.getOriginalFilename();
            String filePath = "/Users/jessiekuo/Desktop/pic/" + fileName; //改你自己的路徑
            File file = new File(filePath);
            image.transferTo(file);
            article.setImagePath("images/" + fileName); // 存储相对路径
        }

            Article savedArticle = articleService.saveArticle(article, userId);
            return ResponseEntity.ok(savedArticle);
        } catch (Exception e) {
            logger.error("Error adding article", e);
            return ResponseEntity.status(500).build();
        }
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

    //特定user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Article>> getArticlesByUserId(@PathVariable Integer userId) {
        List<Article> articles = articleService.getArticlesByUserId(userId);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/getArticle/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        Optional<Article> articleOptional = articleService.findArticleById(id);
        if (articleOptional.isPresent()) {
            Article article = articleOptional.get();
            return ResponseEntity.ok(article);
        } else {
            return ResponseEntity.notFound().build();
        }
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
