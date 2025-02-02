package com.photo.gallery.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "albums")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "album_id")
    private Long albumId;

    // Add the ManyToOne relationship with UserProfile
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", referencedColumnName = "profile_id", nullable = false)
    private UserProfile userProfile;  // ✅ Each album belongs to one user profile

    @ManyToMany(mappedBy = "albums", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Photo> photos;  // ❌ No CascadeType.REMOVE to prevent photo deletion.


    @Column(name = "album_name")
    private String albumName; // Album name

    @Column(name = "created_at")
    private LocalDateTime createdAt; // Timestamp when album was created

    // Constructors
    public Album() {}

    public Album(String albumName, LocalDateTime createdAt, UserProfile userProfile) {
        this.albumName = albumName;
        this.createdAt = createdAt;
        this.userProfile = userProfile;
    }

    // Getters and Setters
    public Long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(Long albumId) {
        this.albumId = albumId;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Album [albumId=" + albumId + ", albumName=" + albumName + ", createdAt=" + createdAt + "]";
    }
}
