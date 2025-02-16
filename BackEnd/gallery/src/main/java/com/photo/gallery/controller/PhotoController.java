package com.photo.gallery.controller;

import com.photo.gallery.model.Photo;
import com.photo.gallery.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/photo")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    // Upload photo with optional album name
    @PostMapping("/upload")
    public ResponseEntity<String> uploadPhoto(
            @RequestParam("profile_id") Long profileId,
            @RequestParam("photo") MultipartFile file,
            @RequestParam(value = "album_name", required = false) String albumName) {
        try {
            String publicId = photoService.uploadPhoto(profileId, file, albumName);
            return publicId != null
                    ? ResponseEntity.ok(publicId)
                    : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading photo.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

//    // Get all photo URLs by profileId
//    @GetMapping("/{profileId}")
//    public ResponseEntity<?> getPhotos(@PathVariable Long profileId) {
//        List<Map<String, String>> photos = photoService.getPhotosWithPublicId(profileId);
//        return photos.isEmpty()
//                ? ResponseEntity.ok("No Photos To Display")
//                : ResponseEntity.ok(photos);
//    }
// Get all photos (with optional sorting by updatedTime)
@GetMapping("/{profileId}")
public ResponseEntity<?> getPhotos(@PathVariable Long profileId, @RequestParam(value = "order", required = false) String order) {
    List<Photo> photos;

    if (order != null && (order.equalsIgnoreCase("asc") || order.equalsIgnoreCase("desc"))) {
        photos = photoService.getPhotosSortedByUploadTime(profileId, order);
    } else {
        List<Map<String, String>> photoData = photoService.getPhotosWithPublicId(profileId);
        return photoData.isEmpty()
                ? ResponseEntity.ok("No Photos To Display")
                : ResponseEntity.ok(photoData);
    }

    return ResponseEntity.ok(photos);
}

    // Delete photo by publicId
    @DeleteMapping("/delete")
    public ResponseEntity<String> deletePhoto(@RequestParam String publicId) throws IOException {
        return photoService.deletePhoto(publicId)
                ? ResponseEntity.ok("Photo deleted successfully!")
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete photo.");
    }
}
