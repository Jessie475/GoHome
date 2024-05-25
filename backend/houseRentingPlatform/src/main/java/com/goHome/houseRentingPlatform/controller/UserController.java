package com.goHome.houseRentingPlatform.controller;
import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.House;
//import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.model.User;
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


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws Exception {
        List<String> errors = new ArrayList<>();
        if (user.getName() == null || user.getName().isEmpty()) {
            errors.add("Name is required.");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            errors.add("Email is required.");
        }
        else if (userService.emailExists(user.getEmail())) {
            errors.add("Email is already in use.");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            errors.add("Password is required.");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(String.join(", ", errors));
        }

        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    //登入
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User luser) {
        try {
            User users = userService.validateUser(luser.getName(), luser.getPassword());
            if (users != null) {
                return ResponseEntity.ok(users);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/test")
    public String test() {
        return "Hello ";
    }


    // get收藏房屋
    @GetMapping("/{userId}/favhouses")
    public ResponseEntity<List<House>> getFavoriteHouseIds(@PathVariable Long userId) {
        List<House> houses = new ArrayList<>(userService.getFavoriteHouses(userId));
        if (houses != null && !houses.isEmpty()) {
            return ResponseEntity.ok(houses);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // get收藏文章
    @GetMapping("/{userId}/favarticles")
    public ResponseEntity<List<Article>> getFavoriteArticles(@PathVariable Long userId) {
        List<Article> articles = new ArrayList<>(userService.getFavoriteArticles(userId));
        if (articles != null && !articles.isEmpty()) {
            return ResponseEntity.ok(articles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


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