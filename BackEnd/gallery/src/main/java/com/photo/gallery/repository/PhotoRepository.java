package com.photo.gallery.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.photo.gallery.model.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

//  Method to get all photo URLs by profileId
	@Query("SELECT p.photoUrl FROM Photo p WHERE p.userProfile.id = :profileId")
	List<String> findUrlsByProfileId(@Param("profileId") Long profileId);


}
