package com.goHome.houseRentingPlatform.repository;

import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;
import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.model.House.RoomType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface HouseRepository extends JpaRepository<House,Integer> {
    
    @SuppressWarnings("null")
    List<House> findAll();

    @Query("SELECT h.name, h.price, h.roomType FROM House AS h")
    List<House> findAllHouseSummaries();

    //List<House> findByUserId(Integer userId);

    List<House> findByLatIsNullAndLngIsNull();

    List<House> findByAddressContaining(String partialAddress);

    List<House> findByRoomType(RoomType roomType);

    List<House> findBySubsidy(Boolean subsidy);

    List<House> findByPriceBetween(Integer minPrice, Integer maxPrice);

    List<House> findByRateBetween(Double minRate, Double maxRate);

    List<House> findBySizeBetween(Double minSize, Double maxSize);

    List<House> findAllByOrderByPriceDesc();

    List<House> findAllByOrderByPriceAsc();

    List<House> findAllByOrderByRateDesc();

    List<House> findAllByOrderByRateAsc();

    List<House> findAllByOrderBySizeDesc();

    List<House> findAllByOrderBySizeAsc();


}
