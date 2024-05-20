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

import com.goHome.houseRentingPlatform.model.A_Comment;
import com.goHome.houseRentingPlatform.service.A_CommentService;

    @RestController
    @RequestMapping("/A_comments")
    public class A_CommentController {

        @Autowired
        private A_CommentService ACommentService;

        @PostMapping("/addComment")
        public ResponseEntity<A_Comment> createComment(@RequestBody A_Comment comment) {
            A_Comment savedComment = ACommentService.addComment(comment);
            return ResponseEntity.ok(savedComment);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
            ACommentService.deleteComment(id);
            return ResponseEntity.ok().build();
        }

        @GetMapping("/article/{articleId}")
        public ResponseEntity<List<A_Comment>> getCommentsByArticleId(@PathVariable Long articleId) {
            List<A_Comment> comments = ACommentService.getCommentsByArticleId(articleId);
            return ResponseEntity.ok(comments);
        }
    }


