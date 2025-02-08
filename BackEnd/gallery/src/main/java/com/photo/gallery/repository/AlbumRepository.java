package com.photo.gallery.repository;

import com.photo.gallery.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    Optional<Album> findByUserProfile_ProfileIdAndAlbumName(Long profileId, String albumName);

    // Get all albums for a profile, sorted by createdAt (ascending or descending)
    @Query("SELECT a FROM Album a WHERE a.userProfile.profileId = :profileId ORDER BY a.createdAt DESC")
    List<Album> findAllByProfileIdSortedDesc(@Param("profileId") Long profileId);

    @Query("SELECT a FROM Album a WHERE a.userProfile.profileId = :profileId ORDER BY a.createdAt ASC")
    List<Album> findAllByProfileIdSortedAsc(@Param("profileId") Long profileId);
}
