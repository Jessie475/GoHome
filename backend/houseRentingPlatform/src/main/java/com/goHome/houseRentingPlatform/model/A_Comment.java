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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    @Column(name = "content", nullable = false, length = 500)
    private String content;
    @Column(name = "comment_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date commentTime;

public A_Comment(Long id, Article article, User userId, String content) {
    this.id = id;
    this.article = article;
    this.userId = userId;
    this.content = content;
}
public User getUserId() {
    return userId;
}

public void setUserId(User userId) {
    this.userId = userId;
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
}

