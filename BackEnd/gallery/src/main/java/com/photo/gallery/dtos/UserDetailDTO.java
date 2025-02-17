package com.photo.gallery.dtos;

import com.photo.gallery.model.Role;
import com.photo.gallery.model.UserProfile;
import java.time.LocalDateTime;

public class UserDetailDTO {
    private Long userId;
    private String userName;
    private String email;
    private boolean verified;
    private Role roleName; // To get role name directly
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    // User Profile fields
    private Long profileId;
    private String fullName;
    private String contact;
    private String address;
    private String profileUrl;
    private String dob;

    // Constructor
    public UserDetailDTO(Long userId, String userName, String email, boolean verified, Role role,
                         LocalDateTime createdDate, LocalDateTime updatedDate, UserProfile userProfile) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.verified = verified;
        this.roleName = role;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;

        // Set profile data if available
        if (userProfile != null) {
            this.profileId = userProfile.getProfileId();
            this.fullName = userProfile.getFullName();
            this.contact = userProfile.getContact();
            this.address = userProfile.getAddress();
            this.profileUrl = userProfile.getProfileUrl();
            this.dob = userProfile.getDob() != null ? userProfile.getDob().toString() : null;
        }
    }

    // Getters & Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public Role getRoleName() {
        return roleName;
    }

    public void setRoleName(Role roleName) {
        this.roleName = roleName;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Long getProfileId() {
        return profileId;
    }

    public void setProfileId(Long profileId) {
        this.profileId = profileId;
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

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }
}
