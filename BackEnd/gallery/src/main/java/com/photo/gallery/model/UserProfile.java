package com.photo.gallery.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long profileId;  // Primary key

//    @OneToOne
//    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
//    private User user;  // Reference to the User entity
    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "user_id",referencedColumnName = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;


    private String fullName;
    private String contact;
    private String address;
    private String profileUrl;
    private LocalDate dob;  // Date of birth

    // Constructors
    public UserProfile() {
    }

    public UserProfile(User user, String fullName, String contact, String address, String profileUrl, LocalDate dob) {
        this.user = user;
        this.fullName = fullName;
        this.contact = contact;
        this.address = address;
        this.profileUrl = profileUrl;
        this.dob = dob;
    }

    // Getters and Setters
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

    public String getEmail() {
        return user != null ? user.getEmail() : null; // Auto-fetch email from User
    }

    public String getUsername() {
        return user != null ? user.getUserName() : null; // Auto-fetch username from User
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

    @Override
    public String toString() {
        return "UserProfile [profileId=" + profileId + ", user=" + user + ", email=" + getEmail() + ", username=" + getUsername()
                + ", fullName=" + fullName + ", contact=" + contact + ", address=" + address + ", profileUrl="
                + profileUrl + ", dob=" + dob + "]";
    }
}
