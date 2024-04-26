package com.goHome.houseRentingPlatform.service;

import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.repository.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HouseServiceImpl implements HouseService{
    @Override
    public void updateHouse(House house) {
        houseRepository.save(house);
    }
    @Override
    public List<House> getHousesWithBlankLatLng() {
        return houseRepository.findByLatIsNullAndLngIsNull();
    }
    @Autowired
    private HouseRepository houseRepository;
    @Override
    public House saveHouse(House house) {
        return houseRepository.save(house);
    }

    @Override
    public List<House> getAllHouses() {
        return houseRepository.findAll();
    }
}
