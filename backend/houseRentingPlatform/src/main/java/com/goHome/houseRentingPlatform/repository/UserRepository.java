<<<<<<< HEAD
package com.goHome.houseRentingPlatform.repository;

import com.goHome.houseRentingPlatform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByIdentity(String identity);
    Optional<User> findByName(String name);
    List<User> findByPhone(String phone);  // Assume that phone is a String type as per User model
    List<User> findByEmail(String email);  // Added method to find users by email
}
=======
//package com.goHome.houseRentingPlatform.repository;
//
//import com.goHome.houseRentingPlatform.model.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface UserRepository extends JpaRepository<User, Integer> {
//    List<User> findByIdentity(String identity);
//    List<User> findByName(String name);
//    List<User> findByPhone(String phone);  // Assume that phone is a String type as per User model
//    List<User> findByEmail(String email);  // Added method to find users by email
//    Optional<User> findByUsername(String username);
//}
>>>>>>> f63493a2ed31133ba4620634bc8e13e483b8c5f4
