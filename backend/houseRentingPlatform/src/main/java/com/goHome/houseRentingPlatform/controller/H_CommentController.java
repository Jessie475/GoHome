// package com.goHome.houseRentingPlatform.controller;
// 
// import java.util.List;
// 
// import com.goHome.houseRentingPlatform.model.H_Comment;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// 
// import com.goHome.houseRentingPlatform.service.H_CommentService;
// 
// @RestController
// @RequestMapping("/H_comments")
// public class H_CommentController {
// 
//     @Autowired
//     private H_CommentService commentService;
// 
//     @PostMapping("/addComment")
//     public ResponseEntity<H_Comment> createComment(@RequestBody H_Comment comment) {
//         H_Comment savedComment = commentService.addComment(comment);
//         return ResponseEntity.ok(savedComment);
//     }
// 
//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
//         commentService.deleteComment(id);
//         return ResponseEntity.ok().build();
//     }
// 
//     @GetMapping("/house/{houseId}")
//     public ResponseEntity<List<H_Comment>> getCommentsByArticleId(@PathVariable Long houseId) {
//         List<H_Comment> comments = commentService.getCommentsByHouseId(houseId);
//         return ResponseEntity.ok(comments);
//     }
// }
// 
// 
