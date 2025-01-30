package com.photo.gallery.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long profileId;  // Primary key
    
    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;  // Reference to the User entity

    private String fullName;
    private String contact;
    private String address;
    private String profileUrl;
    private LocalDate dob;  // Date of birth


@OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
private List<Album> albums;  // When UserProfile is deleted, all its albums will be deleted.

@OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
private List<Photo> photos;  // When UserProfile is deleted, all its photos will be deleted.
    // Constructors, Getters, and Setters
    public UserProfile() {}

    public UserProfile(User user, String fullName, String contact, String address, String profileUrl, LocalDate dob) {
        this.user = user;
        this.fullName = fullName;
        this.contact = contact;
        this.address = address;
        this.profileUrl = profileUrl;
        this.dob = dob;
    }

    public Long getProfileId() {
        return profileId;
    }

    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public List<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(List<Album> albums) {
        this.albums = albums;
    }

    @Override
    public String toString() {
        return "UserProfile [profileId=" + profileId + ", user=" + user + ", fullName=" + fullName + ", contact=" + contact 
               + ", address=" + address + ", profileUrl=" + profileUrl + ", dob=" + dob + "]";
    }
}
