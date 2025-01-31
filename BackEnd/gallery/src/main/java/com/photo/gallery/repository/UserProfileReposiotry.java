package com.photo.gallery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.photo.gallery.model.UserProfile;

public interface UserProfileReposiotry extends JpaRepository<UserProfile, Long> {

}
