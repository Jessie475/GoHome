package com.goHome.houseRentingPlatform.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByType(ArticleType type);

    List<Article> findByTypeAndRateBetween(ArticleType type, Double minRate, Double maxRate);

    Page<Article> findAllByOrderByCreatedAtDesc(Pageable pageable);

    List<Article> findByAddressAndType(String address, ArticleType tag);

    List<Article> findByAddressContainingIgnoreCase(String address);
    
    List<Article> findByAddress(String address);
    static List<Article> findByUser_UserId(Integer userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByUser_UserId'");
    }
    
    Article getArticleById(Long id);

    //@Query("SELECT a FROM Article a JOIN a.users u GROUP BY a ORDER BY COUNT(u) DESC")
    //Page<Article> findAllByFavoriteCountDesc(Pageable pageable);
    
    @Query("SELECT a FROM Article a LEFT JOIN a.comments c GROUP BY a ORDER BY COUNT(c) DESC")
    Page<Article> findAllByCommentCountDesc(Pageable pageable);

    @Query("SELECT a FROM Article a WHERE a.address LIKE %:address%")
    List<Article> findByAddressContaining(@Param("address") String address);

}
