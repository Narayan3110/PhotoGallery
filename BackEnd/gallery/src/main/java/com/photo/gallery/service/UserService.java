package com.photo.gallery.service;

import com.photo.gallery.dtos.UserDTO;
import com.photo.gallery.model.Role;
import com.photo.gallery.model.User;
import com.photo.gallery.repository.UserRepository;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

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


}
