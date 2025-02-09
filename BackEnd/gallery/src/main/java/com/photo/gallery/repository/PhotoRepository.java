package com.photo.gallery.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.photo.gallery.model.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

	// Get all photo URLs by profileId
	@Query("SELECT p.publicId, p.photoUrl FROM Photo p WHERE p.userProfile.profileId = :profileId")
	List<Object[]> findPhotoUrlsAndPublicIdsByProfileId(@Param("profileId") Long profileId);

	// Get photos sorted by upload time (Ascending)
	List<Photo> findByUserProfileProfileIdOrderByUploadedAtAsc(Long profileId);

	// Get photos sorted by upload time (Descending)
	List<Photo> findByUserProfileProfileIdOrderByUploadedAtDesc(Long profileId);

	Optional<Photo> findByPublicId(String publicId);
}
