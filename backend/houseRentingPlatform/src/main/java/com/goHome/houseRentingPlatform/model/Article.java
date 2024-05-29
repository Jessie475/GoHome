package com.goHome.houseRentingPlatform.model;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;


@Entity
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long articleId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String address;

    @Column
    private Double rate;

    @Column(nullable = false, length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ArticleType type;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt; 

    @OneToMany(mappedBy = "article", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<A_Comment> comments;

    // Constructors, Getters and Setters
    public Article() {}

    public Article(Long id,String title, String address, Double rate, String description, ArticleType type) {
        this.articleId = id;
        this.title = title;
        this.address = address;
        this.rate = rate;
        this.description = description;
        this.type = type;
    }

    public Long getId() {
        return articleId;
    }

    public void setId(Long id) {
        this.articleId = id;
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

    public ArticleType getType() {
        return type;
    }

    public void setType(ArticleType type) {
        this.type = type;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Set<A_Comment> getComments() {
        return comments;
    }

    public void setComments(Set<A_Comment> comments) {
        this.comments = comments;
    }

public enum ArticleType {
    HOUSE_REVIEW, ROOMMATE_SEARCH
}
}
