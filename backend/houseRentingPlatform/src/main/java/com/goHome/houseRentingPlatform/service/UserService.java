//package com.goHome.houseRentingPlatform.service;
//
//import com.goHome.houseRentingPlatform.model.Article;
//import com.goHome.houseRentingPlatform.model.House;
//import com.goHome.houseRentingPlatform.model.User;
//import com.goHome.houseRentingPlatform.repository.ArticleRepository;
//import com.goHome.houseRentingPlatform.repository.HouseRepository;
//import com.goHome.houseRentingPlatform.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private HouseRepository houseRepository;
//
//    @Autowired
//    private ArticleRepository articleRepository;
//
//    public User addUser(User user) {
//        return userRepository.save(user);
//    }
//
//    public Optional<User> getUserById(Integer id) {
//        return userRepository.findById(id);
//    }
//
//    //加入FavHouse
//    public void addFavHouseToUser(Integer userId, Integer houseId) {
//        Optional<User> optionalUser = userRepository.findById(userId);
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//
//            House house = houseRepository.findById(houseId)
//                    .orElseThrow(() -> new ResourceNotFoundException("House not found with id: " + houseId));
//            user.addFavHouse(house);
//            userRepository.save(user);
//        } else {
//            throw new ResourceNotFoundException("User not found with id: " + userId);
//        }
//    }
//
//    //移除FavHouse
//    public void removeFavHouseFromUser(Integer userId, Integer houseId) {
//        Optional<User> optionalUser = userRepository.findById(userId);
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//
//            House house = houseRepository.findById(houseId)
//                    .orElseThrow(() -> new ResourceNotFoundException("House not found with id: " + houseId));
//            user.removeFavHouse(house);
//            userRepository.save(user);
//        } else {
//            throw new ResourceNotFoundException("User not found with id: " + userId);
//        }
//    }
//
//    //加入FavArticle
//    public void addFavArticleToUser(Integer userId, Long articleId) {
//        Optional<User> optionalUser = userRepository.findById(userId);
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//
//            Article article = articleRepository.findById(articleId)
//                    .orElseThrow(() -> new ResourceNotFoundException("Article not found with id: " + articleId));
//            user.addFavArticle(article);
//            userRepository.save(user);
//        } else {
//            throw new ResourceNotFoundException("User not found with id: " + userId);
//        }
//    }
//
//    //刪除FavArticle
//    public void removeFavArticleFromUser(Integer userId, Long articleId) {
//        Optional<User> optionalUser = userRepository.findById(userId);
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//
//            Article article = articleRepository.findById(articleId)
//                    .orElseThrow(() -> new ResourceNotFoundException("Article not found with id: " + articleId));
//            user.removeFavArticle(article);
//            userRepository.save(user);
//        } else {
//            throw new ResourceNotFoundException("User not found with id: " + userId);
//        }
//    }
//}
