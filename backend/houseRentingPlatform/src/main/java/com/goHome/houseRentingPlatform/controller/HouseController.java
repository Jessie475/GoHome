package com.goHome.houseRentingPlatform.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.model.House.RoomType;
import com.goHome.houseRentingPlatform.repository.HouseRepository;
import com.goHome.houseRentingPlatform.service.HouseService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/house")
@CrossOrigin(origins = "http://localhost:3000")
public class HouseController {
    @Autowired
    private HouseRepository houseRepository;
    @Autowired
    private HouseService houseService;

    public HouseController(HouseService houseService, HouseRepository houseRepository) {
        this.houseRepository = houseRepository;
        this.houseService = houseService;
    }

    @GetMapping("/getAllHouses")
    public ResponseEntity<List<House>> getAllHouses() {
        List<House> houses = houseService.getAllHouses();
        return ResponseEntity.ok(houses);
    }
    @GetMapping("/")
    public List<House> getHousesWithBlankLatLng() {
        return houseService.getHousesWithBlankLatLng();
    }

    @GetMapping("/getHouse/{id}")//顯示單一房屋資訊 OK
    public ResponseEntity<House> getHouseById(@PathVariable Integer id){
        House house = houseService.getAllHouses().stream()
                .filter(a -> a.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("House not found!"));
        //House house = houseService.getHouseById(id);
        double averageRate = houseService.calculateAndSetHouseRate(house);
        house.setRate(averageRate);
        houseRepository.save(house);
        return ResponseEntity.ok(house);
    }
    
    @GetMapping("/getHouseArticle/{id}")//顯示單一房屋相關文章
    public List<Article> findRelateArticle(@PathVariable Integer id){
        List<Article> articles = houseService.findRelateArticle(id);
        return articles;
    }

    @GetMapping("/search")//以地址模糊篩選OK
    public ResponseEntity<Object> searchHousesByPartialAddress(@RequestParam String partialAddress) {
        List<House> houses = houseRepository.findByAddressContaining(partialAddress);
        if (houses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("House not found!");
        }
        return ResponseEntity.ok(houses);
    }

    @GetMapping("/filterbyPrice")//以價錢區間篩選OK
    public ResponseEntity<List<House>> filterPrice(
            @RequestParam(value = "minPrice", required = false) Integer minPrice,
            @RequestParam(value = "maxPrice", required = false) Integer maxPrice) {
        List<House> houses;
        if (minPrice != null && maxPrice != null) {
            houses = houseRepository.findByPriceBetween(minPrice, maxPrice);
        } else if (minPrice != null) {
            houses = houseRepository.findByPriceGreaterThanEqual(minPrice);
        } else if (maxPrice != null) {
            houses = houseRepository.findByPriceLessThanEqual(maxPrice);
        } else {
            houses = houseRepository.findAll();
        }
        return ResponseEntity.ok(houses);
    }

    @GetMapping("/filterbyRate")//以分數區間篩選OK
    public ResponseEntity<List<House>> filterRate(
            @RequestParam(value = "minRate", required = false) Double minRate,
            @RequestParam(value = "maxRate", required = false) Double maxRate) {
        List<House> houses;
        if (minRate != null && maxRate != null) {
            houses = houseRepository.findByRateBetween(minRate, maxRate);
        } else if (minRate != null) {
            houses = houseRepository.findByRateGreaterThanEqual(minRate);
        } else if (maxRate != null) {
            houses = houseRepository.findByRateLessThanEqual(maxRate);
        } else {
            houses = houseRepository.findAll();
        }
        return ResponseEntity.ok(houses);
    }

    @GetMapping("/filterbySize")//以大小區間篩選OK
    public ResponseEntity<List<House>> filterSize(
            @RequestParam(value = "minSize", required = false) Double minSize,
            @RequestParam(value = "maxSize", required = false) Double maxSize) {
        List<House> houses;
        if (minSize != null && maxSize != null) {
            houses = houseRepository.findBySizeBetween(minSize, maxSize);
        } else if (minSize != null) {
            houses = houseRepository.findBySizeGreaterThanEqual(minSize);
        } else if (maxSize != null) {
            houses = houseRepository.findBySizeLessThanEqual(maxSize);
        } else {
            houses = houseRepository.findAll();
        }
        return ResponseEntity.ok(houses);
    }

    @GetMapping("/filterbyRoomtype")//以房型篩選)OK
    public List<House> getHousesByRoomtype(@RequestParam RoomType roomtype) {
        return houseRepository.findByRoomType(roomtype);
    }

    @GetMapping("/filterbySubsidy")//以租屋補助篩選OK
    public List<House> getHousesBySubsidy(@RequestParam Boolean subsidy) {
        return houseRepository.findBySubsidy(subsidy);
    }

    @GetMapping("/sortbyPrice")//以房價高低排列OK
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

    @GetMapping("/sortbyRate")//以評分高低排列OK
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
    
    @GetMapping("/sortbySize")//以房屋大小排列OK
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
    public ResponseEntity<House> saveHouse(
        @RequestParam("title") String title,
        @RequestParam("type") RoomType type,
        @RequestParam("size") Double size,
        @RequestParam("price") Integer price,
        @RequestParam("subsidy") Boolean subsidy,
        @RequestParam("lease") Double lease,
        @RequestParam("startdate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        @RequestParam("address") String address,
        @RequestParam("contactInfo") String contactInfo,
        @RequestParam("description") String description,
        @RequestParam("restriction") String restriction,
        @RequestParam(value = "image", required = false) MultipartFile image)  {
        
        try {
            House house = new House();
            house.setTitle(title);
            house.setroomType(type);
            house.setsize(size);
            house.setprice(price);
            house.setsubsidy(subsidy);
            house.setlease(lease);;
            house.setstartdate(startDate);
            house.setAddress(address);
            house.setcontactInfo(contactInfo);
            house.setdescription(description);;
            house.setrestriction(restriction);;

            // 如果有图片则设置图片
            if (image != null && !image.isEmpty()) {
                house.setImage(image.getBytes());
            }

            House savedHouse = houseService.saveHouse(house);
            return ResponseEntity.ok(savedHouse);
        } catch (IOException e) {
            // 处理图片字节转换错误
            //logger.error("Error saving house image", e);
            return ResponseEntity.status(500).build();
        } catch (Exception e) {
            // 处理其他可能的错误
            //logger.error("Error adding house", e);
            return ResponseEntity.status(500).build();
        }
    }
    

    @PutMapping("/Update/{id}")//更新房屋資訊 ok
    public ResponseEntity<House> updateHouse(@PathVariable("id") Integer id, @RequestBody House housedetail) {
        return ResponseEntity.ok(houseService.updateHouse(id, housedetail));
    }

    @PutMapping("/updateLatLng/{id}")
    public ResponseEntity<House> updateLatLng(@PathVariable("id") Integer id, @RequestBody House houseDetails) {
        House house = houseRepository.findById(id).orElseThrow(() -> new RuntimeException("House not found!"));
        house.setLat(houseDetails.getLat());
        house.setLng(houseDetails.getLng());
        houseRepository.save(house);
        return ResponseEntity.ok(house);
    }

    @DeleteMapping("/delete/{id}")//刪除房屋資訊 OK
    public ResponseEntity<String> deleteHouse(@PathVariable("id") Integer id) {
        if (houseService.existsById(id)) {
            houseService.deleteHouse(id);
            return ResponseEntity.ok("House deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("House not found");
        }
    }
    
    
    
}