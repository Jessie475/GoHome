package com.goHome.houseRentingPlatform.repository;

import com.goHome.houseRentingPlatform.model.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House,Integer> {
    
    @SuppressWarnings("null")
    List<House> findAll();

    @Query("SELECT new com.example.HouseSummary(h.name, h.price, h.roomtype) FROM House h")
    List<House> findAllHouseSummaries();

    //List<House> findByUserId(Integer userId);

    List<House> findByLatIsNullAndLngIsNull();

    List<House> findByAddressContaining(String partialAddress);

    List<House> findByRoomType(String roomType);

    List<House> findBySubsidy(Boolean subsidy);

    List<House> findByPriceBetween(Integer minPrice, Integer maxPrice);

    List<House> findByRateBetween(Integer minRate, Integer maxRate);

    List<House> findBySizeBetween(Integer minSize, Integer maxSize);

    List<House> findAllByOrderByPriceDesc(Integer price);

    List<House> findAllByOrderByPriceAsc(Integer price);

    List<House> findAllByOrderByRateDesc(Integer rate);

    List<House> findAllByOrderByRateAsc(Integer rate);

    List<House> findAllByOrderBySizeDesc(Integer size);

    List<House> findAllByOrderBySizeAsc(Integer size);


}