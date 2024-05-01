package com.goHome.houseRentingPlatform.service;

import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.repository.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HouseServiceImpl implements HouseService{
    @Autowired
    private HouseRepository houseRepository;

    public HouseServiceImpl(HouseRepository houseRepository) {
        this.houseRepository = houseRepository;
    }
    
    @Override
    public House saveHouse(House house) {//新增房子
        return houseRepository.save(house);
    }
    @Override
    public List<House> getAllHouses() {//從資料庫抓所有房子資料
        return houseRepository.findAll();
    }
    @Override
    public House updateHouse(Integer id, House housedetail) {//更新房子資訊
        return houseRepository.findById(id)
                .map(house ->{
                    house.setAddress(housedetail.getAddress());
                    house.setName(housedetail.getName());
                    house.setcondition(housedetail.getcondition());
                    house.setcontactinfo(housedetail.getcontactinfo());
                    house.setdescription(housedetail.getdescription());
                    house.setlease(housedetail.getlease());
                    house.setprice(housedetail.getprice());
                    house.setrate(housedetail.getrate());
                    house.setroomtype(housedetail.getroomtype());
                    house.setLat(housedetail.getLat());
                    house.setLng(housedetail.getLng());
                    return houseRepository.save(house);
                })
                .orElseThrow(() -> new RuntimeException("House not found with id " + id));
    }
    @Override
    public List<House> getHousesWithBlankLatLng() {
        return houseRepository.findByLatIsNullAndLngIsNull();
    }
    @Override
    public void deleteHouse(Integer id) {
        houseRepository.deleteById(id);
    }
}
