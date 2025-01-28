package com.photo.gallery.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.photo.gallery.model.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long>{

}
