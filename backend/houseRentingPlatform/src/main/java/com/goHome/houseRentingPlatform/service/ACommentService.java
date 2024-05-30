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
    // 检查评论对象中是否有文章属性
    if (comment.getArticle() == null) {
        // 如果没有设置文章属性，可以抛出异常或者给出默认值
        throw new IllegalArgumentException("评论对象必须包含有效的文章");
    }
    // 设置评论时间
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
}
