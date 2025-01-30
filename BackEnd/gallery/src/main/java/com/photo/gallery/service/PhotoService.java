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
}
