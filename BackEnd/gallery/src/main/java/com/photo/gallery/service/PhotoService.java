package com.photo.gallery.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.photo.gallery.model.Photo;
import com.photo.gallery.model.UserProfile;
import com.photo.gallery.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PhotoService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private UserProfileService userProfileService;

    // Method to upload a photo to Cloudinary and save photo details in the database
    public String uploadPhoto(Long profileId, byte[] fileBytes, String originalFilename, String contentType, long fileSize) {
        try {
            // Fetch UserProfile using the profileId
            System.out.println("Profile ID: " + profileId);
            UserProfile userProfile = userProfileService.findByProfileId(profileId);

            // Upload photo to Cloudinary and get the upload result
            Map uploadResult = cloudinary.uploader().upload(fileBytes,
                    ObjectUtils.asMap("folder", "user_photos/" + profileId));

            // Create a new Photo object and set its properties
            Photo photo = new Photo();
            photo.setUserProfile(userProfile);
            photo.setFilename(originalFilename);
            photo.setPhotoUrl(uploadResult.get("secure_url").toString());
            photo.setFileSize(fileSize);
            photo.setPhotoType(contentType);
            photo.setUploadedAt(LocalDateTime.now());

            // Save the photo object in the database
            photoRepository.save(photo);

            return "Photo successfully uploaded!";
        } catch (IOException e) {
            // Log error and return the error message
            System.err.println("Error uploading photo: " + e.getMessage());
            return "Error uploading photo: " + e.getMessage();
        }
    }

    // Method to retrieve photo URLs for a given profileId
    public List<String> getUrls(Long profileId) {
        // Fetch and return all URLs for the given profileId
        return photoRepository.findUrlsByProfileId(profileId);
    }
    

    // Method to delete a photo from Cloudinary and remove its database entry
//    public boolean deletePhoto(Long profileId, String photoUrl) {
//        try {
//            // Find the photo by profileId and photoUrl
//            Optional<Photo> photoOptional = photoRepository.findByUserProfile_ProfileIdAndPhotoUrl(profileId, photoUrl);
//
//            if (photoOptional.isPresent()) {
//                Photo photo = photoOptional.get();
//
//                // Extract the public_id from the Cloudinary URL
//                String publicId = extractPublicId(photoUrl);
//
//                if (publicId != null) {
//                    // Delete the photo from Cloudinary
//                    Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
//
//                    if ("ok".equals(result.get("result"))) {
//                        // Delete the photo from the database
//                        photoRepository.delete(photo);
//                        return true;
//                    }
//                }
//            }
//            return false;
//        } catch (Exception e) {
//            System.err.println("Error deleting photo: " + e.getMessage());
//            return false;
//        }
//    }
//
//    // Helper method to extract the Cloudinary public_id from the photo URL
//    private String extractPublicId(String photoUrl) {
//        try {
//            // Cloudinary image URLs usually follow this format:
//            // https://res.cloudinary.com/<cloud-name>/image/upload/v123456789/<folder>/<filename>.jpg
//            String[] parts = photoUrl.split("/");
//            int length = parts.length;
//
//            if (length > 1) {
//                // Extract the filename with extension
//                String filenameWithExtension = parts[length - 1];
//
//                // Extract only the filename (without extension)
//                String filename = filenameWithExtension.substring(0, filenameWithExtension.lastIndexOf('.'));
//
//                // Extract the folder name if applicable
//                String folderPath = parts[length - 2]; // Assuming folder is always before filename
//
//                return folderPath + "/" + filename; // public_id format: folder/filename
//            }
//        } catch (Exception e) {
//            System.err.println("Error extracting public_id from URL: " + e.getMessage());
//        }
//        return null;
//    }
}
