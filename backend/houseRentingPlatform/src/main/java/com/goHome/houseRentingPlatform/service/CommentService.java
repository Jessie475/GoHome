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

    //新增評論
    public void addComment(Long articleId, Long userId, String content) {
        String sql = "INSERT INTO comment (article_id, user_id, comment_content, comment_time) VALUES (?, ?, ?, CURRENT_TIMESTAMP)";
        jdbcTemplate.update(sql, articleId, userId, content);
    }

    // 根據文章ID找評論
    public List<CommentDTO> getCommentsByArticleId(Long articleId) {
        String sql = "SELECT comment_id, user_id, comment_content, comment_time FROM comment WHERE article_id = ?";
        return jdbcTemplate.query(sql,new CommentRowMapper(), articleId);
    }

    //根據userID找評論
    public List<CommentDTO> getCommentsByUserId(Long userId) {
        String sql = "SELECT comment_id, article_id, comment_content, comment_time FROM comment WHERE user_id = ?";
        return jdbcTemplate.query(sql, new CommentRowMapper(), userId);
    }
    
     //删除評論
     public void deleteComment(Long commentId) {
        String sql = "DELETE FROM comment WHERE comment_id = ?";
        jdbcTemplate.update(sql, commentId);
    }

    //更新評論
    public void updateComment(Long commentId, String newContent) {
        String sql = "UPDATE comment SET comment_content = ? WHERE comment_id = ?";
        jdbcTemplate.update(sql, newContent, commentId);
    }

    // 通用的RowMapper，映射SQL查询结果到CommentDTO
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
