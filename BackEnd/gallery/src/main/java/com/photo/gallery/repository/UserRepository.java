package com.photo.gallery.repository;

import com.photo.gallery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String userName);

    Boolean existsByUserName(String userName);

    Optional<User> findById(Long userId) ;
//    Boolean existsByEmail(String email);
//
    Optional<User> findByEmail(String email);
}
