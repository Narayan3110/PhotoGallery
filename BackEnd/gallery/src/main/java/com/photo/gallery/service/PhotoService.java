package com.photo.gallery.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.photo.gallery.model.Album;
import com.photo.gallery.model.Photo;
import com.photo.gallery.model.UserProfile;
import com.photo.gallery.repository.AlbumRepository;
import com.photo.gallery.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PhotoService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private AlbumRepository albumRepository;

    // Upload photo
    public String uploadPhoto(Long profileId, MultipartFile file, String albumName) throws IOException {
        UserProfile userProfile = userProfileService.findByProfileId(profileId);

        // Upload photo to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder", "user_photos/" + profileId));

        String publicId = uploadResult.get("public_id").toString();
        String photoUrl = uploadResult.get("secure_url").toString();

        // Save photo details
        Photo photo = new Photo();
        photo.setUserProfile(userProfile);
        photo.setFilename(file.getOriginalFilename());
        photo.setPublicId(publicId);
        photo.setPhotoUrl(photoUrl);
        photo.setFileSize(file.getSize());
        photo.setPhotoType(file.getContentType());
        photo.setUploadedAt(LocalDateTime.now());

        // Save the photo in the repository
        photoRepository.save(photo);

        // Associate photo with album if albumName is provided
        if (albumName != null) {
            associatePhotoWithAlbum(profileId, albumName, photo);
        }

        return publicId;
    }

    // Associate a photo with an album
    private void associatePhotoWithAlbum(Long profileId, String albumName, Photo photo) {
        Optional<Album> albumOptional = albumRepository.findByUserProfile_ProfileIdAndAlbumName(profileId, albumName);
        if (albumOptional.isPresent()) {
            Album album = albumOptional.get();
            if (photo.getAlbums() == null) {
                photo.setAlbums(new HashSet<>());
            }
            photo.getAlbums().add(album);
            photoRepository.save(photo);
        } else {
            throw new RuntimeException("Album not found with Name: " + albumName);
        }
    }

    // Get a photo by ID and profileId
    public Photo getPhotoById(Long profileId, Long id) {
        Photo photo = photoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Photo with ID " + id + " not found"));

        if (photo.getUserProfile().getProfileId().equals(profileId)) {
            return photo;
        } else {
            throw new RuntimeException("Photo with ID " + id + " not found for Profile ID " + profileId);
        }
    }

    // Delete photo
    public boolean deletePhoto(String publicId) throws IOException {
        Optional<Photo> photoOptional = photoRepository.findByPublicId(publicId);

        if (photoOptional.isPresent()) {
            Photo photo = photoOptional.get();

            // Delete from Cloudinary
            Map result = cloudinary.uploader().destroy(photo.getPublicId(), ObjectUtils.emptyMap());

            if ("ok".equals(result.get("result"))) {
                // Delete from the database
                photoRepository.delete(photo);
                return true;
            }
        }
        return false;
    }

    // Get all photos with publicId for a profileId
    public List<Map<String, String>> getPhotosWithPublicId(Long profileId) {
        List<Object[]> result = photoRepository.findPhotoUrlsAndPublicIdsByProfileId(profileId);
        List<Map<String, String>> photos = new ArrayList<>();

        for (Object[] row : result) {
            Map<String, String> photo = new HashMap<>();
            photo.put("publicId", (String) row[0]);
            photo.put("photoUrl", (String) row[1]);
            photos.add(photo);
        }

        return photos;
    }

    // Get photos sorted by uploaded time
    public List<Photo> getPhotosSortedByUploadTime(Long profileId, String order) {
        if ("asc".equalsIgnoreCase(order)) {
            return photoRepository.findByUserProfileProfileIdOrderByUploadedAtAsc(profileId);
        } else {
            return photoRepository.findByUserProfileProfileIdOrderByUploadedAtDesc(profileId);
        }
    }
}
