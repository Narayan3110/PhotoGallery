package com.photo.gallery.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.photo.gallery.model.Role;
import com.photo.gallery.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

//@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
//@AllArgsConstructor
public class UserDTO {

    private Long userId;
    private String userName;
    private String email; 
    private Role role;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    //    private boolean accountNonLocked;
//    private boolean accountNonExpired;
//    private boolean credentialsNonExpired;
//    private boolean enabled;
//    private LocalDate credentialsExpiryDate;
//    private LocalDate accountExpiryDate;
//    private String twoFactorSecret;
//    private boolean isTwoFactorEnabled;
//    private String signUpMethod;
   

    // Custom constructor to be used when only basic user info is needed (without all the flags).
//    public UserDTO(Long userId, String userName, String email, Role role, LocalDateTime createdDate, LocalDateTime updatedDate) {
//        this.userId = userId;
//        this.userName = userName;
//        this.email = email;
//        this.role = role;
//        this.createdDate = createdDate;
//        this.updatedDate = updatedDate;
//        // Default values for other fields, as they might be optional
//        this.accountNonLocked = true; // Default to true if not set
//        this.accountNonExpired = true;
//        this.credentialsNonExpired = true;
//        this.enabled = true;
//        this.isTwoFactorEnabled = false; // Default to false
//    }

    public UserDTO(Long userId, String userName, String email, Role role, LocalDateTime createdDate, LocalDateTime updatedDate) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.role = role;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
    
    @Override
    public String toString() {
        return "UserDTO{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", createdDate=" + createdDate +
                ", updatedDate=" + updatedDate +
                '}';
    }





}
