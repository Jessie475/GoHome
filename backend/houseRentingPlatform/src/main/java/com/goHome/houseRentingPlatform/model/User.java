package com.goHome.houseRentingPlatform.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler","articles","house"})
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "identity", nullable = false, length = 50)
    private Identity identity;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "phone", nullable = true, length = 15)
    private String phone;

    @Column(name = "nationality", nullable = true, length = 100)
    private String nationality;

    @Column(name = "gender", nullable = true, length = 50)
    private String gender;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Article> articles;

    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // private List<House> houses;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_favorite_house",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "house_id", referencedColumnName = "house_id")
    )
    private List<House> favoriteHouses;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_favorite_article",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "article_id", referencedColumnName = "article_id")
    )
    private List<Article> favoriteArticles;

    // Constructors, getters, and setters
    public User() {
    }

    public User(Integer userId, Identity identity, String name, String phone, String gender, String email, String password) {
        this.userId = userId;
        this.identity = identity;
        this.name = name;
        this.phone = phone;
        //this.nationality = nationality;
        this.gender = gender;
        this.email = email;
        this.password = password;
    }

    public enum Identity {
        Landlord, Tenant
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Identity getIdentity() {
        return identity;
    }

    public void setIdentity(Identity identity) {
        this.identity = identity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }

    // public List<House> getHouses() {
    //     return houses;
    // }

    // public void setHouses(List<House> houses) {
    //     this.houses = houses;
    // }
    
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

//     public String getNationality() {
//         return nationality;
//     }
// 
//     public void setNationality(String nationality) {
//         this.nationality = nationality;
//     }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<House> getFavoriteHouses() {
        return favoriteHouses;
    }

    public void setFavoriteHouses(List<House> favoriteHouses) {
        this.favoriteHouses = favoriteHouses;
    }

    public List<Article> getFavoriteArticles() {
        return favoriteArticles;
    }

    public void setFavoriteArticles(List<Article> favoriteArticles) {
        this.favoriteArticles = favoriteArticles;
    }

    public void addFavoriteHouse(House house) {
        this.favoriteHouses.add(house);
    }

    public void removeFavoriteHouse(House house) {
        this.favoriteHouses.remove(house);
    }

    public void addFavoriteArticle(Article article) {
        this.favoriteArticles.add(article);
    }

    public void removeFavoriteArticle(Article article) {
        this.favoriteArticles.remove(article);
    }
}
