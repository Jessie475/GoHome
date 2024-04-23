package com.goHome.houseRentingPlatform.controller;

import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/house")
public class HouseController {
    @Autowired
    private HouseService houseService;

    @PostMapping("/addHouse")
    public String add(@RequestBody House house){
        houseService.saveHouse(house);
        return "New house is added";
    }

    @GetMapping("/getAllHouses")
    public List<House> getAllHouses(){
        return houseService.getAllHouses();
    }
}
