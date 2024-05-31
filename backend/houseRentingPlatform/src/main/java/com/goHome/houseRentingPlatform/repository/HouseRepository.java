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

    @Query("SELECT h.title, h.price, h.roomType FROM House AS h")
    List<House> findAllHouseSummaries();

    House getHouseById(Integer id);

    List<House> findByLatIsNullAndLngIsNull();

    //List<House> findByUser_UserId(Integer userId);

    List<House> findByAddressContaining(String partialAddress);

    List<House> findByRoomType(RoomType roomType);

    List<House> findBySubsidy(Boolean subsidy);

    List<House> findByPriceBetween(Integer minPrice, Integer maxPrice);

    List<House> findByPriceGreaterThanEqual(Integer minPrice);

    List<House> findByPriceLessThanEqual(Integer maxPrice);

    List<House> findByRateBetween(Double minRate, Double maxRate);

    List<House> findByRateGreaterThanEqual(Double minRate);

    List<House> findByRateLessThanEqual(Double maxRate);

    List<House> findBySizeBetween(Double minSize, Double maxSize);

    List<House> findBySizeGreaterThanEqual(Double minSize);

    List<House> findBySizeLessThanEqual(Double maxSize);

    List<House> findAllByOrderByPriceDesc();

    List<House> findAllByOrderByPriceAsc();

    List<House> findAllByOrderByRateDesc();

    List<House> findAllByOrderByRateAsc();

    List<House> findAllByOrderBySizeDesc();

    List<House> findAllByOrderBySizeAsc();

    static List<House> findByUser_UserId(Integer userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByUser_UserId'");
    }


}
