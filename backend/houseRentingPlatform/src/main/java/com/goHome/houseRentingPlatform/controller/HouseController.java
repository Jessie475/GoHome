package com.goHome.houseRentingPlatform.controller;

import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/house")
@CrossOrigin
public class HouseController {
    @Autowired
    private HouseService houseService;

    @PutMapping("/{id}")
    public void updateHouse(@PathVariable Integer id, @RequestBody House updatedHouse) {
        House existingHouse = houseService.getAllHouses().stream()
                .filter(house -> house.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("House not found"));
        existingHouse.setLat(updatedHouse.getLat());
        existingHouse.setLng(updatedHouse.getLng());
        houseService.updateHouse(existingHouse);
    }

    @GetMapping("/")
    public List<House> getHousesWithBlankLatLng() {
        return houseService.getHousesWithBlankLatLng();
    }
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
