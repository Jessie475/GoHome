// package com.goHome.houseRentingPlatform.service;
// 
// import org.springframework.beans.factory.annotation.Autowired;
// 
// import org.springframework.stereotype.Service;
// 
// import com.goHome.houseRentingPlatform.model.A_Comment;
// import com.goHome.houseRentingPlatform.model.Article;
// import com.goHome.houseRentingPlatform.model.H_Comment;
// import com.goHome.houseRentingPlatform.model.House;
// import com.goHome.houseRentingPlatform.model.User;
// import com.goHome.houseRentingPlatform.model.User.Identity;
// import com.goHome.houseRentingPlatform.repository.A_CommentRepository;
// import com.goHome.houseRentingPlatform.repository.ArticleRepository;
// import com.goHome.houseRentingPlatform.repository.H_CommentRepository;
// import com.goHome.houseRentingPlatform.repository.HouseRepository;
// import com.goHome.houseRentingPlatform.repository.UserRepository;
// 
// import java.util.List;
// import java.util.Optional;
// 
// @Service
// public class UserService{
// 
//     @Autowired
//     private UserRepository userRepository;
//     @Autowired
//     private HouseRepository houseRepository;
//     @Autowired
//     private ArticleRepository articleRepository;
// 
// 
//     public UserService(UserRepository userRepository, HouseRepository houseRepository, ArticleRepository articleRepository) {
//         this.userRepository = userRepository;
//         this.houseRepository = houseRepository;
//         this.articleRepository = articleRepository;
//     }
// 
//     public User createUser(String username, String email, String password, String name, String phone, String gender, Identity identity) {
// 
//         User newUser = new User();
//         newUser.setName(username);
//         newUser.setEmail(email);
//         newUser.setPassword(password);
//         newUser.setName(name);
//         newUser.setPhone(phone);
//         newUser.setGender(gender);
//         newUser.setIdentity(identity);
//         //newUser.setNationality(nationality);
// 
//         return userRepository.save(newUser);
//     }
// 
//     public boolean emailExists(String email) {
//         User user = userRepository.findByEmail(email);
//         return user != null;
//     }
//     
//     // public User addUser(User user) {
//     //     return userRepository.save(user);
//     // }
// 
//     public User validateUser(String username, String password) {
//         Optional<User> userOptional = userRepository.findByName(username);
//         if (userOptional.isPresent()) {
//             User user = userOptional.get();
//             // 檢查密碼
//             if (user.getPassword().equals(password)) {
//                 return user;
//             }
//         }
//         return null;
//     }
// 
//     public User getUserById(Integer id) {
//         return userRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
//     }
//     
//     public List<House> getFavoriteHouses(Integer userId) {
//         User user = userRepository.findByUserId(userId).orElse(null);
//         return user != null ? user.getFavoriteHouses() : null;
//     }
// 
//     public List<Article> getFavoriteArticles(Integer userId) {
//         User user = userRepository.findByUserId(userId).orElse(null);
//         return user != null ? user.getFavoriteArticles() : null;
//     }
// 
// 
//     
//     public List<H_Comment> getMyHComments(Integer userId) {
//         List<H_Comment> hComment = H_CommentRepository.findByUserId(userId);
//         return hComment;
//     }
//     public List<A_Comment> getMyAComments(Integer userId) {
//         List<A_Comment> aComment = A_CommentRepository.findByUserId(userId);
//         return aComment;
//     }
// 
//     public List<House> getMyHouse(Integer userId) {
//         return houseRepository.findByUser_UserId(userId);
//     }
//     
//     public List<Article> getMyArticle(Integer userId) {
//         List<Article> myarticle = ArticleRepository.findByUser_UserId(userId);
//         return myarticle;
//     }
//     
// 
//     public void addFavHouseToUser(User user, Integer houseId) {
//         House house = houseRepository.findById(houseId)
//                 .orElseThrow(() -> new RuntimeException("House not found with id " + houseId));        
//         user.addFavoriteHouse(house);
//         userRepository.save(user);
//     }
// 
//     public void removeFavHouseFromUser(User user, Integer houseId) {
//         House house = houseRepository.findById(houseId)
//                 .orElseThrow(() -> new RuntimeException("House not found with id " + houseId));
//         user.removeFavoriteHouse(house);
//         userRepository.save(user);
//     }
// 
//     public void addFavArticleToUser(User user, Long articleId) {
//         Article article = articleRepository.findById(articleId)
//                 .orElseThrow(() -> new RuntimeException("Article not found with id " + articleId));
//         user.addFavoriteArticle(article);
//         userRepository.save(user);
//     }
// 
//     public void removeFavArticleFromUser(User user, Long articleId) {
//         Article article = articleRepository.findById(articleId)
//                 .orElseThrow(() -> new RuntimeException("Article not found with id " + articleId));
//         user.removeFavoriteArticle(article);
//         userRepository.save(user);
//     }
// 
//     /*private User findUserByIdentity(String username) {
//         return null;
//     }*/
// 
// }

package com.goHome.houseRentingPlatform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goHome.houseRentingPlatform.model.A_Comment;
import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.H_Comment;
import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.model.User;
import com.goHome.houseRentingPlatform.model.User.Identity;
import com.goHome.houseRentingPlatform.repository.A_CommentRepository;
import com.goHome.houseRentingPlatform.repository.ArticleRepository;
import com.goHome.houseRentingPlatform.repository.H_CommentRepository;
import com.goHome.houseRentingPlatform.repository.HouseRepository;
import com.goHome.houseRentingPlatform.repository.UserRepository;

@Service
public class UserService{

    @Autowired
    private UserRepository userRepository;

    private HouseRepository houseRepository;
    private ArticleRepository articleRepository;

    public UserService(UserRepository userRepository, HouseRepository houseRepository, ArticleRepository articleRepository) {
        this.userRepository = userRepository;
        this.houseRepository = houseRepository;
        this.articleRepository = articleRepository;
    }
// 
//     public UserService(UserRepository userRepository, HouseRepository houseRepository, ArticleRepository articleRepository) {
//         this.userRepository = userRepository;
//         this.houseRepository = houseRepository;
//         this.articleRepository = articleRepository;
//     }

    public User createUser(String username, String email, String password, String name, String phone, String gender, Identity identity) {

        User newUser = new User();
        newUser.setName(username);
        newUser.setEmail(email);
        newUser.setPassword(password);
        newUser.setName(name);
        newUser.setPhone(phone);
        newUser.setGender(gender);
        newUser.setIdentity(identity);
        //newUser.setNationality(nationality);
        return userRepository.save(newUser);
    }

    public boolean emailExists(String email) {
        User user = userRepository.findByEmail(email);
        return user != null;
    }
    
    // public User addUser(User user) {
    //     return userRepository.save(user);
    // }

    public User validateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        // 檢查密碼
        if (user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    public List<House> getFavoriteHouses(Integer userId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        return user != null ? user.getFavoriteHouses() : null;
    }

    public List<Article> getFavoriteArticles(Integer userId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        return user != null ? user.getFavoriteArticles() : null;
    }


    
    public List<H_Comment> getMyHComments(Integer userId) {
        List<H_Comment> hComment = H_CommentRepository.findByUserId(userId);
        return hComment;
    }
    public List<A_Comment> getMyAComments(Integer userId) {
        List<A_Comment> aComment = A_CommentRepository.findByUserId(userId);
        return aComment;
    }


    public List<House> getMyHouses(Integer userId) {
        return houseRepository.findByUser_UserId(userId);
    }

    public List<Article> getMyArticles(Integer userId) {
        return articleRepository.findByUser_UserId(userId);
    }

    public void addFavHouseToUser(User user, Integer houseId) {
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new RuntimeException("House not found with id " + houseId));        
        user.addFavoriteHouse(house);
        userRepository.save(user);
    }

    public void removeFavHouseFromUser(User user, Integer houseId) {
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new RuntimeException("House not found with id " + houseId));
        user.removeFavoriteHouse(house);
        userRepository.save(user);
    }

    public void addFavArticleToUser(User user, Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found with id " + articleId));
        user.addFavoriteArticle(article);
        userRepository.save(user);
    }

    public void removeFavArticleFromUser(User user, Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found with id " + articleId));
        user.removeFavoriteArticle(article);
        userRepository.save(user);
    }
    
    public boolean updateUser(Integer userId, String email, String phone) {
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            user.setEmail(email);
            user.setPhone(phone);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /*private User findUserByIdentity(String username) {
        return null;
    }*/

}