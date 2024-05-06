package com.goHome.houseRentingPlatform.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "Article")
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "tag", nullable = false)
    private ArticleType tag;

    @Column(name = "rate", nullable = true)
    private Double rate;

    @Column(name = "description", nullable = false, length = 2000)
    private String description;

    // Constructors
    public Article() {
    }

    public Article(String title, String address, ArticleType tag, Double rate, String description) {
        this.title = title;
        this.address = address;
        this.tag = tag;
        this.rate = rate;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public ArticleType getTag() {
        return tag;
    }

    public void setTag(ArticleType tag) {
        this.tag = tag;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

enum ArticleType {
    HOUSE_REVIEW, ROOMMATE_SEARCH
}

