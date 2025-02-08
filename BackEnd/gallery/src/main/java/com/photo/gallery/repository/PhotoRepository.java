package com.photo.gallery.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.photo.gallery.model.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

//  Method to get all photo URLs by profileId
	@Query("SELECT p.photoUrl FROM Photo p WHERE p.userProfile.id = :profileId")
	List<String> findUrlsByProfileId(@Param("profileId") Long profileId);

	Optional<Photo> findByPublicId(String publicId);
	
	
	@Query("SELECT p.publicId, p.photoUrl FROM Photo p WHERE p.userProfile.profileId = :profileId")
	List<Object[]> findPhotoUrlsAndPublicIdsByProfileId(Long profileId);

	List<Photo> findByUserProfile_ProfileIdOrderByUploadedAtDesc(Long profileId);
	List<Photo> findByUserProfile_ProfileIdOrderByUploadedAtAsc(Long profileId);
}
