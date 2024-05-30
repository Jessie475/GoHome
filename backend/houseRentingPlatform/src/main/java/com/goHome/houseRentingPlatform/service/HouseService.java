package com.goHome.houseRentingPlatform.service;


import com.goHome.houseRentingPlatform.model.Article;
import com.goHome.houseRentingPlatform.model.Article.ArticleType;
import com.goHome.houseRentingPlatform.model.House;
import com.goHome.houseRentingPlatform.repository.ArticleRepository;
import com.goHome.houseRentingPlatform.repository.HouseRepository;
import com.goHome.houseRentingPlatform.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class HouseService {

    @Autowired
    private HouseRepository houseRepository;
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private UserRepository userRepository;

    
    public House saveHouse(House house) {//新增房子
        return houseRepository.save(house);
    }

    public List<House> getAllHouses() {//從資料庫抓所有房子資料
        return houseRepository.findAll();
    }

    // public List<House> getHouseesByUserId(Integer userId) {
    //     return houseRepository.findByUser_UserId(userId);
    // }

    public House updateHouse(Integer id, House housedetail) {//更新房子資訊
        return houseRepository.findById(id)
                .map(house ->{
                    house.setAddress(housedetail.getAddress());
                    house.setTitle(housedetail.getTitle());
                    house.setLat(housedetail.getLat());
                    house.setLng(housedetail.getLng());
                    house.setrestriction(housedetail.getrestriction());
                    house.setcontactInfo(housedetail.getcontactInfo());
                    house.setdescription(housedetail.getdescription());
                    house.setlease(housedetail.getlease());
                    house.setprice(housedetail.getprice());
                    house.setRate(housedetail.getRate());
                    house.setroomType(housedetail.getroomType());
                    house.setsize(housedetail.getsize());
                    house.setsubsidy(housedetail.getsubsidy());
                    house.setstartdate(housedetail.getstartdate());
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

    public boolean existsById(Integer id) {//檢查房子是否存在
        return houseRepository.existsById(id);
    }
 
    public House getHouseById(Integer id) {
        return houseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("House not found with id " + id));
    }
    
    public double calculateAndSetHouseRate(House house) {
        List<Article> articles = articleRepository.findByAddressAndType(house.getAddress(), ArticleType.HOUSE_REVIEW);
        if (!articles.isEmpty()) {
            double totalRate = 0;
            int count = 0;
            for (Article article : articles) {
                if (article.getRate() != null) { // 检查评分是否为null
                    totalRate += article.getRate();
                    count++;
                }
            }
            if (count > 0) {
                double averageRate = totalRate / count;
                return averageRate;
            }
        }
        return 0;
    }

    public List<Article> findRelateArticle(Integer id) {
        House house = houseRepository.getHouseById(id);
        return articleRepository.findByAddress(house.getAddress());
    }
}