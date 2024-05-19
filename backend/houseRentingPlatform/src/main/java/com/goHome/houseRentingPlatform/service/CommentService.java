package com.goHome.houseRentingPlatform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goHome.houseRentingPlatform.model.A_Comment;
import com.goHome.houseRentingPlatform.repository.CommentRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public A_Comment addComment(A_Comment comment) {
        return commentRepository.save(comment);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    public List<A_Comment> getCommentsByArticleId(Long articleId) {
        return commentRepository.findByArticleId(articleId);
    }
}
