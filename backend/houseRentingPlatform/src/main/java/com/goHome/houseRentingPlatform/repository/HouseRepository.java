package com.goHome.houseRentingPlatform.repository;

import com.goHome.houseRentingPlatform.model.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House,Integer> {
    
    @SuppressWarnings("null")
    List<House> findAll();

    List<House> findByUserId(Integer userId);

    List<House> findByLatIsNullAndLngIsNull();


}
