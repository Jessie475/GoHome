package com.goHome.houseRentingPlatform.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;
import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.repository.ArticleRepository;
import com.goHome.houseRentingPlatform.repository.HouseRepository;
import com.goHome.houseRentingPlatform.repository.UserRepository;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private UserRepository userRepository;

    public Article saveArticle(Article article, Integer userId) {
        if (article.getType() == ArticleType.HOUSE_REVIEW) {
            List<House> houses = houseRepository.findByAddressContaining(article.getAddress());
            if (houses.isEmpty()) {
                throw new RuntimeException("House not found with address: " + article.getAddress());
            }
            House house = houses.get(0);
            if (house.getcontactInfo().equals(userRepository.findById(userId).get().getEmail())) {
                throw new RuntimeException("User cannot review their own rented house.");
            }
        }
        return articleRepository.save(article);
    }

    public void deleteArticle(Long articleId) {
        articleRepository.deleteById(articleId);
    }

    public Optional<Article> findArticleById(Long articleId) {
        return articleRepository.findById(articleId);
    }

    public Article updateArticle(Long articleId, Article updatedArticle) {
        return articleRepository.findById(articleId).map(article -> {
            article.setTitle(updatedArticle.getTitle());
            article.setAddress(updatedArticle.getAddress());
            article.setRate(updatedArticle.getRate());
            article.setDescription(updatedArticle.getDescription());
            article.setType(updatedArticle.getType());
            return articleRepository.save(article);
        }).orElseThrow(() -> new RuntimeException("Article not found!"));
    }

    public List<Article> filterArticlesByType(ArticleType type) {
        return articleRepository.findByType(type);
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public List<Article> filterArticlesByTypeAndRate(ArticleType type, Double minRate, Double maxRate) {
        if (type == ArticleType.HOUSE_REVIEW) {
            return articleRepository.findByTypeAndRateBetween(type, minRate, maxRate);
        }
        return articleRepository.findByType(type);
    }

    public Page<Article> getArticlesSortedByNewest(int page, int size) {
        return articleRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size));
    }

    public Page<Article> getArticlesSortedByCommentCount(int page, int size) {
        return articleRepository.findAllByCommentCountDesc(PageRequest.of(page, size));
    }
    public Article getArticleById(Long id){
        return articleRepository.getArticleById(id);
    }

    //search
    public List<Article> searchArticlesByAddress(String address) {
        return articleRepository.findByAddressContainingIgnoreCase(address);
    }

  //  public Page<Article> getArticlesSortedByFavoriteCount(int page, int size) {
      //  return articleRepository.findAllByFavoriteCountDesc(PageRequest.of(page, size));
  //  }

}
