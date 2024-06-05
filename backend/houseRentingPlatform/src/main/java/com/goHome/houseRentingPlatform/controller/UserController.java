package com.goHome.houseRentingPlatform.controller;
import com.goHome.houseRentingPlatform.model.A_Comment;
import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.H_Comment;
import com.goHome.houseRentingPlatform.model.House;
//import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.model.User;
import com.goHome.houseRentingPlatform.service.ACommentService;
// import com.goHome.houseRentingPlatform.service.H_CommentService;
//import com.goHome.houseRentingPlatform.service.HouseService;
import com.goHome.houseRentingPlatform.service.UserService;

import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.xml.stream.events.Comment;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    // @Autowired
    // private H_CommentService H_CommentService;
    @Autowired
    private ACommentService ACommentService;



    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User newUser) {
        try {
            User createdUser = userService.createUser(newUser.getName(), newUser.getEmail(), newUser.getPassword(), newUser.getName(), newUser.getPhone(), newUser.getGender(), newUser.getIdentity());
            if (createdUser != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create user");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User luser) {
        try {
            User user = userService.validateUser(luser.getEmail(), luser.getPassword());
            if (user != null) {
                return ResponseEntity.ok(user); // 返回完整的用户信息
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // get favhouse/favarticle/mycomment/myhouse/

    // get收藏房屋
    @GetMapping("/{userId}/favhouses")
    public ResponseEntity<List<House>> getFavoriteHouseIds(@PathVariable Integer userId) {
        List<House> houses = new ArrayList<>(userService.getFavoriteHouses(userId));
        if (houses != null && !houses.isEmpty()) {
            return ResponseEntity.ok(houses);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // get收藏文章
    @GetMapping("/{userId}/favarticles")
    public ResponseEntity<List<Article>> getFavoriteArticles(@PathVariable Integer userId) {
        List<Article> articles = new ArrayList<>(userService.getFavoriteArticles(userId));
        if (articles != null && !articles.isEmpty()) {
            return ResponseEntity.ok(articles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // get comment
    @GetMapping("/{userId}/mycomment")
    public ResponseEntity<List<Object>> getMyComment(@PathVariable Integer userId) {
        // List<H_Comment> h_comments = new ArrayList<>(H_CommentService.getHcommentsByUserId(userId));
        List<A_Comment> a_comments = new ArrayList<>(userService.getMyAComments(userId));
        List<Object> allComments = new ArrayList<>();
        // allComments.addAll(h_comments);
        allComments.addAll(a_comments);

        if (allComments != null && !allComments.isEmpty()) {
            return ResponseEntity.ok(allComments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // get我的房屋
    @GetMapping("/{userId}/myhouse")
    public ResponseEntity<List<House>> getMyHouse(@PathVariable Integer userId) {
        List<House> myhouses = new ArrayList<>(userService.getMyHouse(userId));
        if (myhouses != null && !myhouses.isEmpty()) {
            return ResponseEntity.ok(myhouses);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // get我的文章
    @GetMapping("/{userId}/myarticle")
    public ResponseEntity<List<Article>> getMyArticle(@PathVariable Integer userId) {
        List<Article> myarticles = new ArrayList<>(userService.getMyArticle(userId));
        if (myarticles != null && !myarticles.isEmpty()) {
            return ResponseEntity.ok(myarticles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    //add+remove house & article

    // add收藏房屋
    @PostMapping("/{userId}/favorite-houses/{houseId}")
    public ResponseEntity<?> addFavoriteHouse(@PathVariable Integer userId, @PathVariable Integer houseId) {
        try {
            User user = userService.getUserById(userId);
            userService.addFavHouseToUser(user, houseId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // remove收藏房屋
    @DeleteMapping("/{userId}/favorite-houses/{houseId}")
    public ResponseEntity<?> removeFavoriteHouse(@PathVariable Integer userId, @PathVariable Integer houseId) {
        try {
            User user = userService.getUserById(userId);;
            userService.removeFavHouseFromUser(user, houseId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // add收藏文章
    @PostMapping("/{userId}/favorite-articles/{articleId}")
    public ResponseEntity<?> addFavoriteArticle(@PathVariable Integer userId, @PathVariable Long articleId) {
        try {
            User user = userService.getUserById(userId);
            userService.addFavArticleToUser(user, articleId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // remove收藏文章
    @DeleteMapping("/{userId}/favorite-articles/{articleId}")
    public ResponseEntity<?> removeFavoriteArticle(@PathVariable Integer userId, @PathVariable Long articleId) {
        try {
            User user = userService.getUserById(userId);
            userService.removeFavArticleFromUser(user, articleId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}