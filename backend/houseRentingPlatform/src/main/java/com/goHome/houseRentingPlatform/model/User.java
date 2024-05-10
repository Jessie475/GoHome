package com.goHome.houseRentingPlatform.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;


@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id")
    private Integer userId;

    @Column(name = "identity", nullable = false, length = 225)
    private String identity;
    //房客 as true, 房東 as false

    @Column(name = "name", nullable = false, length = 225)
    private String name;

    @Column(name = "phone", nullable = true)
    private Integer phone;

    @Column(name = "nationality", nullable = true, length = 225)
    private String nationaility;

    @Column(name = "gender", nullable = true, length = 225)
    private String gender;

    public User(int id, String identity, String name, int phone, String nationaility, String gender){
        this.id = id;
        this.identity = identity;
        this.name = name;
        this.phone = phone;
        this.nationaility = nationaility;
        this.gender = gender;
    }

    public void setid(int id){
        this.id = id;
    }
    public Integer getid() {
        return id;
    }
    public void setIdentity(String identity){
        this.identity = identity;
    }
    public String getIdentity(){
        return identity;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public void setPhone(int phone){
        this.phone = phone;
    }
    public int getPhone(){
        return phone;
    }
    public void setNationaility(String nationaility){
        this.nationaility = nationaility;
    }
    public String getidentity(){
        return identity;
    }
    public void setgender(String gender){
        this.gender = gender;
    }
    public String getgender(){
        return gender;
    }

    @ManyToMany
    @JoinTable(
        name = "user_favorite_house",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "house_id")
    )
    private Set<House> favoriteHouses = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "user_favorite_article",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "article_id")
    )
    private Set<Article> favoriteArticles = new HashSet<>();

    public void setFavHouses(Set<House> favoriteHouses) {
        this.favoriteHouses = favoriteHouses;
    }
    public Set<House> getFavHouses() {
        return favoriteHouses;
    }
//看文章跟房屋要不要知道被誰收藏

    // 添加收藏房屋
    public void addFavHouse(House house) {
        favoriteHouses.add(house);
        //house.getFavoritedBy().add(this);
    }

    // 移除收藏房屋
    public void removeFavHouse(House house) {
        favoriteHouses.remove(house);
        //house.getFavoritedBy().remove(this);
    }


    public void setFavArticle(Set<House> favoriteHouses) {
        this.favoriteHouses = favoriteHouses;
    }
    public Set<Article> getFavArticle() {
        return favoriteArticles;
    }

    // 添加收藏文章
    public void addFavArticle(Article article) {
        favoriteArticles.add(article);
        //article.getFavoritedBy().add(this);
    }

    // 移除收藏文章
    public void removeFavArticle(Article article) {
        favoriteArticles.remove(article);
        //article.getFavoritedBy().remove(this);
    }



}