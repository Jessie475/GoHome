package com.goHome.houseRentingPlatform.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "users") // Ensure the table name is according to database naming standards
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_favorite_house",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "house_id", referencedColumnName = "house_id")
    )
    private List<House> favoriteHouses;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_favorite_article",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "article_id", referencedColumnName = "article_id")
    )
    private List<Article> favoriteArticles;
    

    // Constructors, getters, and setters
    public User() {
    }

    public User(Integer id, Identity identity, String name, String phone, String nationality, String gender, String email, String password) {
        this.id = id;
        this.identity = identity;
        this.name = name;
        this.phone = phone;
        this.nationality = nationality;
        this.gender = gender;
        this.email = email;
        this.password = password;
    }

    public enum Identity {
        Landlord, Tenant
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

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
 

    //新增、修改、get、set Favorite article和house

    public List<House> getFavHouses() {
        return favoriteHouses;
    }

    public void setFavHouses(List<House> favoriteHouses) {
        this.favoriteHouses = favoriteHouses;
    }

    public List<Article> getFavArticles() {
        return favoriteArticles;
    }

    public void setFavArticles(List<Article> favoriteArticles) {
        this.favoriteArticles = favoriteArticles;
    }

    public void addFavHouse(House house) {
        this.favoriteHouses.add(house);
    }

    public void removeFavHouse(House house) {
        this.favoriteHouses.remove(house);
    }

    public void addFavArticle(Article article) {
        this.favoriteArticles.add(article);
    }

    public void removeFavArticle(Article article) {
        this.favoriteArticles.remove(article);
    }

 

}
