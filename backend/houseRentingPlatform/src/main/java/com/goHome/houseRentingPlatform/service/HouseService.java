package com.goHome.houseRentingPlatform.service;

import com.goHome.houseRentingPlatform.model.House;
import org.springframework.stereotype.Service;

import java.util.List;
public interface HouseService {
    public House createHouse(House house);
    public List<House> getAllHouses();
    public House updateHouse(Integer id,House house);
    public List<House> getHousesWithBlankLatLng();
    public void deleteHouse(Integer id);
    public House getHouseById(Integer id);
    public void calculateAndSetHouseRate(House house);
}