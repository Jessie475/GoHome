package com.goHome.houseRentingPlatform.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.model.User;
import com.goHome.houseRentingPlatform.repository.ArticleRepository;
import com.goHome.houseRentingPlatform.repository.HouseRepository;
import com.goHome.houseRentingPlatform.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HouseRepository houseRepository;
    @Autowired
    private ArticleRepository articleRepository;


    public UserService(UserRepository userRepository, HouseRepository houseRepository, ArticleRepository articleRepository) {
        this.userRepository = userRepository;
        this.houseRepository = houseRepository;
        this.articleRepository = articleRepository;
    }

    public User registerUser(User user) {
        user.setPassword(user.getPassword());
        return userRepository.save(user);
    }
    public boolean emailExists(String email) {
        // 假设 userRepository 是您的 JPA 仓库
        User user = userRepository.findByEmail(email);
        return user != null;
    }
    
    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User validateUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByName(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // 检查密码，这里没有加密
            if (user.getPassword().equals(password)) {
                return user;
            }
        }
        return null;
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    

    public void addFavHouseToUser(User user, Integer houseId) {
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new RuntimeException("House not found with id " + houseId));        user.addFavHouse(house);
        userRepository.save(user);
    }

    public void removeFavHouseFromUser(User user, Integer houseId) {
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new RuntimeException("House not found with id " + houseId));
        user.removeFavHouse(house);
        userRepository.save(user);
    }

    public void addFavArticleToUser(User user, Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found with id " + articleId));
        user.addFavArticle(article);
        userRepository.save(user);
    }

    public void removeFavArticleFromUser(User user, Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found with id " + articleId));
        user.removeFavArticle(article);
        userRepository.save(user);
    }

    /*private User findUserByIdentity(String username) {
        return null;
    }*/


}