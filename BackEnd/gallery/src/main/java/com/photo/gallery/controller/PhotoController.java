package com.photo.gallery.controller;

import com.photo.gallery.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/photo")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    // Endpoint to handle photo upload
    @PostMapping("/upload")
    public ResponseEntity<String> uploadPhoto(
            @RequestParam("profile_id") Long profileId,
            @RequestParam("photo") MultipartFile file) throws IOException {
        
        // Print profileId to the console for debugging
        System.out.println("Uploading photo for Profile ID: " + profileId);

        // Call service method to upload the photo and get the result message
        String message = photoService.uploadPhoto(
                profileId, file.getBytes(), file.getOriginalFilename(),
                file.getContentType(), file.getSize()
        );

        // Return the success/error message wrapped in ResponseEntity
        return ResponseEntity.ok(message);
    }

    // Endpoint to get all photo URLs for a specific profileId
    @GetMapping("/{profileId}")
    public ResponseEntity<?> getPhotos(@PathVariable Long profileId) {
        // Retrieve photo URLs from the service layer
        List<String> urls = photoService.getUrls(profileId);

        // Check if the URLs list is empty
        if (urls.isEmpty()) {
            // Return a message if no photos found for the profileId
            return new ResponseEntity<>("No Photos To Display", HttpStatus.OK);
        }

        // Return the list of URLs if photos are found
        return new ResponseEntity<>(urls, HttpStatus.OK);
    }
    
 // Endpoint to delete a photo
//    @DeleteMapping("/delete/{profileId}")
//    public ResponseEntity<String> deletePhoto(@PathVariable Long profileId, @RequestBody String photoUrl) {
//        try {
//            boolean isDeleted = photoService.deletePhoto(profileId, photoUrl);
//            if (isDeleted) {
//                return ResponseEntity.ok("Photo deleted successfully!");
//            } else {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete photo.");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting photo.");
//        }
//    }
}
