package com.photo.gallery.controller;
import com.photo.gallery.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/photo")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

 // Upload photo
    @PostMapping("/upload")
    public ResponseEntity<String> uploadPhoto(
            @RequestParam("profile_id") Long profileId,
            @RequestParam("photo") MultipartFile file) throws IOException {

        // Call the service method to upload the photo and get the result
        String publicId = photoService.uploadPhoto(
                profileId, file.getBytes(), file.getOriginalFilename(),
                file.getContentType(), file.getSize()
        );

        if (publicId != null) {
            return ResponseEntity.ok(publicId); // Return publicId as part of the response
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading photo.");
        }
    }


    // Get all photo URLs by profileId
    @GetMapping("/{profileId}")
    public ResponseEntity<?> getPhotos(@PathVariable Long profileId) {
        List<Map<String, String>> photos = photoService.getPhotosWithPublicId(profileId);
        return photos.isEmpty()
                ? ResponseEntity.ok("No Photos To Display")
                : ResponseEntity.ok(photos);
    }


    // Delete photo by publicId
//    @DeleteMapping("/delete/{publicId}")
//    public ResponseEntity<String> deletePhoto(@PathVariable String publicId) {
//    	System.out.println(publicId);
//        boolean isDeleted = photoService.deletePhoto(publicId);
//        return isDeleted 
//                ? ResponseEntity.ok("Photo deleted successfully!")
//                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete photo.");
//    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<String> deletePhoto(@RequestParam String publicId) {
        System.out.println("Deleting photo with publicId: " + publicId);
        boolean isDeleted = photoService.deletePhoto(publicId);
        return isDeleted 
                ? ResponseEntity.ok("Photo deleted successfully!")
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete photo.");
    }

}
