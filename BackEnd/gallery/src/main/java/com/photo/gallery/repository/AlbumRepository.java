package com.photo.gallery.repository;

import com.photo.gallery.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    Optional<Album> findByUserProfile_ProfileIdAndAlbumName(Long profileId, String albumName);
}
