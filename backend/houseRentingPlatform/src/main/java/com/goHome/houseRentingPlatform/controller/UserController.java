package com.goHome.houseRentingPlatform.controller;
//import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.model.User;
//import com.goHome.houseRentingPlatform.service.HouseService;
import com.goHome.houseRentingPlatform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;






@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws Exception {
        List<String> errors = new ArrayList<>();

        if (user.getIdentity() == null || user.getIdentity().isEmpty()) {
            errors.add("Identity is required.");
        }
        if (user.getName() == null || user.getName().isEmpty()) {
            errors.add("Name is required.");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            errors.add("Email is required.");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            errors.add("Password is required.");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(String.join(", ", errors));
        }

        try {
            if (userService.emailExists(user.getEmail())) {
                return ResponseEntity.badRequest().body("郵箱已被使用。");
            }
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


    // 添加用户收藏的房屋
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

    // 移除用户收藏的房屋
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

    // 添加用户收藏的文章
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

    // 移除用户收藏的文章
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
//package com.goHome.houseRentingPlatform.controller;
//
//import com.goHome.houseRentingPlatform.model.House;
//import com.goHome.houseRentingPlatform.model.User;
//import com.goHome.houseRentingPlatform.service.HouseService;
//import com.goHome.houseRentingPlatform.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/users")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//    // 注册新用户
//    @PostMapping("/register")
//    public ResponseEntity<User> registerUser(@RequestBody User user) {
//        User registeredUser = userService.registerUser(user);
//        return ResponseEntity.ok(registeredUser);
//    }
//    //登入
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User user) {
//        try {
//            User users = userService.validateUser(user.getName(), user.getPassword());
//            if (users != null) {
//                return ResponseEntity.ok(user);
//            } else {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    // 添加用户收藏的房屋
//    @PostMapping("/{userId}/favorite-houses/{houseId}")
//    public ResponseEntity<?> addFavoriteHouse(@PathVariable Integer userId, @PathVariable Integer houseId) {
//        try {
//            User user = userService.getUserById(userId);
//            userService.addFavHouseToUser(user, houseId);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    // 移除用户收藏的房屋
//    @DeleteMapping("/{userId}/favorite-houses/{houseId}")
//    public ResponseEntity<?> removeFavoriteHouse(@PathVariable Integer userId, @PathVariable Integer houseId) {
//        try {
//            User user = userService.getUserById(userId);;
//            userService.removeFavHouseFromUser(user, houseId);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    // 添加用户收藏的文章
//    @PostMapping("/{userId}/favorite-articles/{articleId}")
//    public ResponseEntity<?> addFavoriteArticle(@PathVariable Integer userId, @PathVariable Long articleId) {
//        try {
//            User user = userService.getUserById(userId);
//            userService.addFavArticleToUser(user, articleId);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    // 移除用户收藏的文章
//    @DeleteMapping("/{userId}/favorite-articles/{articleId}")
//    public ResponseEntity<?> removeFavoriteArticle(@PathVariable Integer userId, @PathVariable Long articleId) {
//        try {
//            User user = userService.getUserById(userId);
//            userService.removeFavArticleFromUser(user, articleId);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//}

