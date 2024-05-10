package com.goHome.houseRentingPlatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goHome.houseRentingPlatform.model.Comment;
import com.goHome.houseRentingPlatform.service.CommentService;

    @RestController
    @RequestMapping("/comments")
    public class CommentController {

        @Autowired
        private CommentService commentService;

        @PostMapping
        public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
            Comment savedComment = commentService.addComment(comment);
            return ResponseEntity.ok(savedComment);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
            commentService.deleteComment(id);
            return ResponseEntity.ok().build();
        }

        @GetMapping("/article/{articleId}")
        public ResponseEntity<List<Comment>> getCommentsByArticleId(@PathVariable Long articleId) {
            List<Comment> comments = commentService.getCommentsByArticleId(articleId);
            return ResponseEntity.ok(comments);
        }
    }

