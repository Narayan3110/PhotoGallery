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
    
//  No Arguments Constructor
    public UserDTO() {
    	
    }
//    Getter and Setter
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
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
