package com.goHome.houseRentingPlatform.repository;

import com.goHome.houseRentingPlatform.model.House;
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

    List<House> findByRoomType(String roomType);

    List<House> findBySubsidy(Boolean subsidy);

    List<House> findByPriceBetween(Integer minPrice, Integer maxPrice);

    List<House> findByRateBetween(Integer minRate, Integer maxRate);

    List<House> findBySizeBetween(Integer minSize, Integer maxSize);

    List<House> findAllByOrderByPriceDesc();

    List<House> findAllByOrderByPriceAsc();

    List<House> findAllByOrderByRateDesc();

    List<House> findAllByOrderByRateAsc();

    List<House> findAllByOrderBySizeDesc();

    List<House> findAllByOrderBySizeAsc();


}
