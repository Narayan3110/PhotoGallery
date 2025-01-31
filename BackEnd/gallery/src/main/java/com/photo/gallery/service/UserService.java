package com.photo.gallery.service;

import com.photo.gallery.dtos.UserDTO;
import com.photo.gallery.model.Role;
import com.photo.gallery.model.User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

public interface UserService {



    // Get all users
    List<User> getAllUsers();

    // Get user by ID
    UserDTO getUserById(Long id);

    // Update user role
    void updateUserRole(Long userId, String roleName);

    // Get all roles
    List<Role> getAllRoles();

//    Update password
    void updatePassword(Long userId, String password);

    User saveUser(User user);

//	ResponseEntity<Object> loginUser(String username, String password);

	Optional<User> findUserByUserEmail(String email);

	Optional<User> getUserUserName(String userName);

	ResponseEntity<Map<String, Object>> loginUser(String userName,String password);
 
}
