package com.photo.gallery.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "photos")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id")
    private Long photoId;

    // Many-to-one relationship with UserProfile
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", referencedColumnName = "profile_id", nullable = false)
    private UserProfile userProfile;  // ✅ Each photo is linked to one user profile

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "photo_album",
        joinColumns = @JoinColumn(name = "photo_id"),
        inverseJoinColumns = @JoinColumn(name = "album_id")
    )
    private Set<Album> albums;  // ❌ No CascadeType.REMOVE to prevent album deletion when a photo is deleted.


    @Column(name = "filename")
    private String filename; // Original file name

    @Column(name = "photo_url")
    private String photoUrl; // Cloudinary URL

    @Column(name = "file_size")
    private Long fileSize; // File size in bytes

    @Column(name = "photo_type")
    private String photoType; // File type (image/png, image/jpeg, etc.)

    @Column(name = "uploaded_at")
    private LocalDateTime uploadedAt; // Timestamp of upload

    // Constructors
    public Photo() {}

    public Photo(UserProfile userProfile, String filename, String photoUrl, Long fileSize, String photoType, LocalDateTime uploadedAt) {
        this.userProfile = userProfile;
        this.filename = filename;
        this.photoUrl = photoUrl;
        this.fileSize = fileSize;
        this.photoType = photoType;
        this.uploadedAt = uploadedAt;
    }

    // Getters and Setters
    public Long getPhotoId() {
        return photoId;
    }

    public void setPhotoId(Long photoId) {
        this.photoId = photoId;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public Set<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getPhotoType() {
        return photoType;
    }

    public void setPhotoType(String photoType) {
        this.photoType = photoType;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    @Override
    public String toString() {
        return "Photo [photoId=" + photoId + ", userProfile=" + userProfile + ", filename=" + filename + ", photoUrl=" + photoUrl
                + ", fileSize=" + fileSize + ", photoType=" + photoType + ", uploadedAt=" + uploadedAt + "]";
    }
}
