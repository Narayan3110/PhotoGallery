package com.photo.gallery.service;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.photo.gallery.model.Album;
import com.photo.gallery.model.Photo;
import com.photo.gallery.model.UserProfile;
import com.photo.gallery.repository.AlbumRepository;
import com.photo.gallery.repository.PhotoRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.desktop.SystemEventListener;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
public class PhotoService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private UserProfileService userProfileService;

//    @Autowired
//    private AlbumService albumService;

    @Autowired
    private AlbumRepository albumRepository;
    
    
    public Photo getPhotoById(Long profileId,Long id) {
    	Photo photo = photoRepository.findById(id)
    			.orElseThrow(() -> new RuntimeException("Photo of id:-"+id+" Not found"));
    	if (photo.getUserProfile().getProfileId()==profileId) {
    		return photo;			
		}else {
            throw new RuntimeException("In ProfileID:- " + profileId+" Photo With Id:- "+id+" Not Found.");
		}
    	
	}
    

    // Upload photo and store publicId
    public String uploadPhoto(Long profileId, byte[] fileBytes, String originalFilename, String contentType, long fileSize , String albumName) {
        try {
            // Fetch user profile
            UserProfile userProfile = userProfileService.findByProfileId(profileId);

            // Upload to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(fileBytes,
                    ObjectUtils.asMap("folder", "user_photos/" + profileId));

            String publicId = uploadResult.get("public_id").toString();
            String photoUrl = uploadResult.get("secure_url").toString();

            // Save photo details in the database
            Photo photo = new Photo();
            photo.setUserProfile(userProfile);
            photo.setFilename(originalFilename);
            photo.setPublicId(publicId); // Store publicId
            photo.setPhotoUrl(photoUrl);
            photo.setFileSize(fileSize);
            photo.setPhotoType(contentType);
            photo.setUploadedAt(LocalDateTime.now());

            // Save the photo to the repository
            photoRepository.save(photo);
            
            if (albumName != null) {
                // Fetch album by ID and associate it with the photo
                Optional<Album> albumOptional = albumRepository.findByUserProfile_ProfileIdAndAlbumName(profileId, albumName);
                if (albumOptional.isPresent()) {
                    Album album = albumOptional.get();
                    if (photo.getAlbums() == null) {
                        photo.setAlbums(new HashSet<>());
                    }
                    photo.getAlbums().add(album);  // Add the album to the photo
                    photoRepository.save(photo);  // Save the photo with album association
                } else {
                    // If album is not found, throw an exception or handle accordingly
                    throw new RuntimeException("Album not found with Name:- " + albumName);
                }
            }
            // Return the publicId after successful upload and save
            return publicId;
        } catch (IOException e) {
            // Log the error and return null in case of an error
            System.err.println("Error uploading photo: " + e.getMessage());
            return null;
        }
    }
    
//  Delete Method For photos
    public boolean deletePhoto(String profileId) {
        try {
            Optional<Photo> photoOptional = photoRepository.findByPublicId(profileId);

            if (photoOptional.isPresent()) {
                Photo photo = photoOptional.get();
                String pId = photo.getPublicId();
                // Delete the photo from Cloudinary
                Map result = cloudinary.uploader().destroy(pId, ObjectUtils.emptyMap());
                System.out.println("Cloudinary delete response: " + result);

                if ("ok".equals(result.get("result"))) {
                    // Delete the photo record from the repository
                    photoRepository.delete(photo);
//                    System.out.println("Photo deleted from repository: " + photo.getId());
                    return true;
                } else {
                    System.out.println("Failed to delete from Cloudinary: " + result.get("result"));
                    return false; // Failed to delete from Cloudinary
                }
            } else {
                System.out.println("Photo not found in repository.");
                return false; // Photo not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Error occurred during deletion
        }
    }
    
    public List<Map<String, String>> getPhotosWithPublicId(Long profileId) {
        List<Object[]> result = photoRepository.findPhotoUrlsAndPublicIdsByProfileId(profileId);
        List<Map<String, String>> photos = new ArrayList<>();
        
        for (Object[] row : result) {
            Map<String, String> photo = new HashMap<>();
            photo.put("publicId", (String) row[0]); // publicId is the first item
            photo.put("photoUrl", (String) row[1]); // photoUrl is the second item
            photos.add(photo);
        }
        
        return photos;
    }

}
