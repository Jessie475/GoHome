package com.goHome.houseRentingPlatform.repository;
import java.util.List;

import com.goHome.houseRentingPlatform.model.H_Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface H_CommentRepository extends JpaRepository<H_Comment, Long>{
    List<H_Comment> findByHouseId(Long houseId);
    static List<H_Comment> findByUserId(Integer userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByUserId'");
    }

}