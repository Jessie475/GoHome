// package com.goHome.houseRentingPlatform.service;
// 
// import java.util.List;
// 
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// 
// import com.goHome.houseRentingPlatform.model.H_Comment;
// import com.goHome.houseRentingPlatform.repository.H_CommentRepository;
// 
// @Service
// public class H_CommentService {
// 
//     @Autowired
//     private H_CommentRepository commentRepository;
// 
//     public H_Comment addComment(H_Comment comment) {
//         return commentRepository.save(comment);
//     }
// 
//     public void deleteComment(Long commentId) {
//         commentRepository.deleteById(commentId);
//     }
// 
//     public List<H_Comment> getCommentsByHouseId(Long houseId) {
//         return commentRepository.findByHouseId(houseId);
//     }
//     
//     public List<H_Comment> getHcommentsByUserId(Integer userId) {
//         return H_CommentRepository.findByUserId(userId);
//     }
// 
// }