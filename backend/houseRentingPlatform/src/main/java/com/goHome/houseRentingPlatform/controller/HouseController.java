package com.goHome.houseRentingPlatform.controller;

import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.repository.HouseRepository;
import com.goHome.houseRentingPlatform.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/house")
@CrossOrigin
public class HouseController {
    @Autowired
    private HouseRepository houseRepository;
    private HouseService houseService;

    @GetMapping("/getAllHouses")//只會出現房屋的部分資訊
    public List<House> getAllHouses(){
        return houseService.getAllHouses();
    }

    @GetMapping("/")
    public List<House> getHousesWithBlankLatLng() {
        return houseService.getHousesWithBlankLatLng();
    }

    @GetMapping("/{id}")//顯示房屋的所有資訊
    public House getHouseById(@PathVariable("id") Integer id){
        House house = houseService.getHouseById(id);
        houseService.calculateAndSetHouseRate(house);
        return houseService.getHouseById(id);
    }

    @GetMapping("/search")//以地址模糊篩選
    public List<House> searchHousesByPartialAddress(@RequestParam String partialAddress) {
        return houseRepository.findByAddressContaining(partialAddress);
    }

    @GetMapping("/filterbyPrice")//以價錢區間篩選
    public List<House> filterPrice(
            @RequestParam(value = "minPrice", required = false) Integer minPrice,
            @RequestParam(value = "maxPrice", required = false) Integer maxPrice) {
        if (minPrice != null && maxPrice != null) {
            return houseRepository.findByPriceBetween(minPrice, maxPrice);
        } else {
            return houseRepository.findAll();
        }
    }

    @GetMapping("/filterbyRate")//以分數區間篩選
    public List<House> filterRate(
            @RequestParam(value = "minRate", required = false) Integer minRate,
            @RequestParam(value = "maxRate", required = false) Integer maxRate) {
        if (minRate != null && maxRate != null) {
            return houseRepository.findByRateBetween(minRate, maxRate);
        } else {
            return houseRepository.findAll();
        }
    }

    @GetMapping("/filterbySize")//以大小區間篩選
    public List<House> filterSize(
            @RequestParam(value = "minSize", required = false) Integer minSize,
            @RequestParam(value = "maxSize", required = false) Integer maxSize) {
        if (minSize != null && maxSize != null) {
            return houseRepository.findBySizeBetween(minSize, maxSize);
        } else {
            return houseRepository.findAll();
        }
    }

    @GetMapping("/filterbyRoomtype")//以房型篩選
    public List<House> getHousesByRoomtype(@RequestParam String roomtype) {
        return houseRepository.findByRoomType(roomtype);
    }

    @GetMapping("/filterbySubsidy")//以租屋補助篩選
    public List<House> getHousesBySubsidy(@RequestParam Boolean subsidy) {
        return houseRepository.findBySubsidy(subsidy);
    }

    @GetMapping("/sortbyPrice")//以房價高低排列
    public List<House> sortPrice(@RequestParam(name = "sortDirection", defaultValue = "desc") String sortDirection) {
        if (sortDirection != null && sortDirection.matches("^(asc|desc)$")) {
            if (sortDirection.equals("asc")) {
                return houseRepository.findAllByOrderByPriceAsc();
            } else {
                return houseRepository.findAllByOrderByPriceDesc();
            }
        }else {
            return houseService.getAllHouses();
        }
    }

    @GetMapping("/sortbyRate")//以評分高低排列
    public List<House> sortRate(@RequestParam(name = "sortDirection", defaultValue = "desc") String sortDirection) {
        if (sortDirection != null && sortDirection.matches("^(asc|desc)$")) {
            if (sortDirection.equals("asc")) {
                return houseRepository.findAllByOrderByRateAsc();
            } else {
                return houseRepository.findAllByOrderByRateDesc();
            }
        }else {
            return houseService.getAllHouses();
        }
    }
    
    @GetMapping("/sortbySize")//以房屋大小排列
    public List<House> sortSize(@RequestParam(name = "sortDirection", defaultValue = "desc") String sortDirection) {
        if (sortDirection != null && sortDirection.matches("^(asc|desc)$")) {
            if (sortDirection.equals("asc")) {
                return houseRepository.findAllByOrderBySizeAsc();
            } else {
                return houseRepository.findAllByOrderBySizeDesc();
            }
        }else {
            return houseService.getAllHouses();
        }
    }
    @PostMapping("/addHouse")
    public String add(@RequestBody House house){
        houseService.createHouse(house);
        return "New house is added";
    }

    @PutMapping("/update{id}")
    public House updateHouse(@PathVariable("id") Integer id, @RequestBody House housedetail) {
        return houseService.updateHouse(id, housedetail);
    }

    @DeleteMapping("/delete{id}")
    public void deleteProduct(@PathVariable("id") Integer id) {
        houseService.deleteHouse(id);
    }

    
    
}