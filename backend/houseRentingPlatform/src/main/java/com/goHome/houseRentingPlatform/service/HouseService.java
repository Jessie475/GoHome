package com.goHome.houseRentingPlatform.service;

import com.goHome.houseRentingPlatform.model.House;

import java.util.List;

public interface HouseService {
    public House saveHouse(House house);
    public List<House> getAllHouses();
    public void updateHouse(House house);
    public List<House> getHousesWithBlankLatLng();

}
