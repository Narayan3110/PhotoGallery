package com.photo.gallery.dtos;

import com.photo.gallery.model.Role;

import java.time.LocalDateTime;

public class UserDTO {

    private Long userId;
    private String userName;
    private String email; 
    private Role role;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    public UserDTO(Long userId, String userName, String email, Role role, LocalDateTime createdDate, LocalDateTime updatedDate) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.role = role;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
    
//	No ArgsConstructor
    public UserDTO() {
    
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
