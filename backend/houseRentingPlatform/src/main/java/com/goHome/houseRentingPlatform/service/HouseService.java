package com.goHome.houseRentingPlatform.service;

import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;
import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.repository.ArticleRepository;
import com.goHome.houseRentingPlatform.repository.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class HouseService {

    @Autowired
    private HouseRepository houseRepository;
    private ArticleRepository articleRepository;

    
    public House createHouse(House house) {//新增房子
        return houseRepository.save(house);
    }

    public List<House> getAllHouses() {//從資料庫抓所有房子資料
        return houseRepository.findAllHouseSummaries();
    }

    public House updateHouse(Integer id, House housedetail) {//更新房子資訊
        return houseRepository.findById(id)
                .map(house ->{
                    house.setAddress(housedetail.getAddress());
                    house.setName(housedetail.getName());
                    house.setLat(housedetail.getLat());
                    house.setLng(housedetail.getLng());
                    house.setrestriction(housedetail.getrestriction());
                    house.setcontactInfo(housedetail.getcontactInfo());
                    house.setdescription(housedetail.getdescription());
                    house.setlease(housedetail.getlease());
                    house.setprice(housedetail.getprice());
                    house.setrate(housedetail.getrate());
                    house.setroomType(housedetail.getroomType());
                    return houseRepository.save(house);
                })
                .orElseThrow(() -> new RuntimeException("House not found with id " + id));
    }

    public List<House> getHousesWithBlankLatLng() {
        return houseRepository.findByLatIsNullAndLngIsNull();
    }

    public void deleteHouse(Integer id) {//刪除房子
        houseRepository.deleteById(id);
    }

 
    public House getHouseById(Integer id) {
        return houseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("House not found with id " + id));
    }



    public void calculateAndSetHouseRate(House house) {
        List<Article> articles = articleRepository.findByAddressAndType(house.getAddress(), ArticleType.HOUSE_REVIEW);
        if (!articles.isEmpty()) {
            double totalRate = 0;
            int count = 0;
            for (Article article : articles) {
                totalRate += article.getRate();
                count++;
            }
            double averageRate = totalRate / count;
            house.setrate(averageRate);
        }
    }
}