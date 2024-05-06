package com.goHome.houseRentingPlatform.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.goHome.houseRentingPlatform.DTO.CommentDTO;

@Service
public class CommentService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 方法：添加评论到数据库
    public void addComment(Long articleId, Long userId, String content) {
        String sql = "INSERT INTO comment (article_id, user_id, comment_content, comment_time) VALUES (?, ?, ?, CURRENT_TIMESTAMP)";
        jdbcTemplate.update(sql, articleId, userId, content);
    }

    // 方法：根据文章ID获取评论
    public List<CommentDTO> getCommentsByArticleId(Long articleId) {
        String sql = "SELECT comment_id, user_id, comment_content, comment_time FROM comment WHERE article_id = ?";
        return jdbcTemplate.query(sql,new CommentRowMapper(), articleId);
    }

    // 新方法：根据用户ID获取评论
    public List<CommentDTO> getCommentsByUserId(Long userId) {
        String sql = "SELECT comment_id, article_id, comment_content, comment_time FROM comment WHERE user_id = ?";
        return jdbcTemplate.query(sql, new CommentRowMapper(), userId);
    }
    
     // 方法：删除评论
     public void deleteComment(Long commentId) {
        String sql = "DELETE FROM comment WHERE comment_id = ?";
        jdbcTemplate.update(sql, commentId);
    }

    // 方法：更新评论
    public void updateComment(Long commentId, String newContent) {
        String sql = "UPDATE comment SET comment_content = ? WHERE comment_id = ?";
        jdbcTemplate.update(sql, newContent, commentId);
    }

    // 通用的RowMapper，用于映射SQL查询结果到CommentDTO对象
    private static class CommentRowMapper implements RowMapper<CommentDTO> {
        @Override
        public CommentDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
            CommentDTO comment = new CommentDTO();
            comment.setCommentId(rs.getLong("comment_id"));
            comment.setUserId(rs.getLong("user_id"));  
            comment.setArticleId(rs.getLong("article_id"));
            comment.setContent(rs.getString("comment_content"));
            comment.setCommentTime(rs.getTimestamp("comment_time"));
            return comment;
        }
    }
}
