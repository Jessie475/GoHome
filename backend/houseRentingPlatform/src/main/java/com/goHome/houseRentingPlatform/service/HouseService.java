package com.goHome.houseRentingPlatform.service;

import com.goHome.houseRentingPlatform.model.House;

import java.util.List;

public interface HouseService {
    public House saveHouse(House house);
    public List<House> getAllHouses();
    public House updateHouse(Integer id,House house);
    public List<House> getHousesWithBlankLatLng();
    public void deleteHouse(Integer id);
}
