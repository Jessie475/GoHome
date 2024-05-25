package com.goHome.houseRentingPlatform.model;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "A_Comment")

public class A_Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "content", nullable = false, length = 500)
    private String content;
    @Column(name = "comment_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date commentTime;

    public A_Comment() {}
    
public A_Comment(Long id, Article article, User userId, String content) {
    this.id = id;
    this.article = article;
    this.user = userId;
    this.content = content;
}
public User getUserId() {
    return user;
}

public void setUserId(User userId) {
    this.user = userId;
}

public String getContent() {
    return content;
}

public void setContent(String content) {
    this.content = content;
}

public Date getCommentTime() {
    return commentTime;
}

public void setCommentTime(Date commentTime) {
    this.commentTime = commentTime;
}

public void setUser(User user) {
    this.user = user;
}

public Article getArticle() {
    return article;
}
}
