package com.goHome.houseRentingPlatform.service;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.goHome.houseRentingPlatform.model.A_Comment;
import com.goHome.houseRentingPlatform.model.User;
import com.goHome.houseRentingPlatform.repository.A_CommentRepository;

@Service
@CrossOrigin(origins = "http://localhost:3000")
public class ACommentService {

    @Autowired
    private A_CommentRepository commentRepository;

   // public A_Comment addComment(A_Comment comment) {
      //  return commentRepository.save(comment);
   // }

   public A_Comment addComment(A_Comment comment,User user) {
    comment.setCommentTime(new Date());
    comment.setUser(user);
    return commentRepository.save(comment);
}

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    public List<A_Comment> getCommentsByArticleId(Long articleId) {
        return commentRepository.findByArticleId(articleId);
    }

    public static List<A_Comment> getAcommentsByUserId(Integer userId) {
        return A_CommentRepository.findByUserId(userId);
    }


}
