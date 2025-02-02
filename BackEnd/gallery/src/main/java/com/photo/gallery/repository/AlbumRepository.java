package com.photo.gallery.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.photo.gallery.model.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    
}

