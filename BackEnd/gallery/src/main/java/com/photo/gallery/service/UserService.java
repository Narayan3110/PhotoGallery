package com.photo.gallery.service;

import com.photo.gallery.dtos.UserDTO;
import com.photo.gallery.model.Role;
import com.photo.gallery.model.User;
import com.photo.gallery.model.UserProfile;
import com.photo.gallery.repository.RoleRepository;
import com.photo.gallery.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    /**
     * Retrieves all users from the database.
     */

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a user by ID and converts it to a DTO.
     */
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDto(user);
    }

    /**
     * Converts User entity to UserDTO.
     */
    private static UserDTO convertToDto(User user) {
        return new UserDTO(
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedDate(),
                user.getUpdatedDate()
        );
    }

    /**
     * Updates a user's role based on the provided role name.
     */
    public void updateUserRole(Long userId, String roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role.RoleName roleEnum;
        try {
            roleEnum = Role.RoleName.valueOf(roleName);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role name provided");
        }

        Role role = roleRepository.findByRoleName(roleEnum)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        userRepository.save(user);
    }

    /**
     * Returns all available roles.
     */
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    /**
     * Updates a user's password after encoding it.
     */
    public void updatePassword(Long userId, String password) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    /**
     * Registers a new user, encoding the password and assigning a default role.
     */
    public User saveUser(User user) {
        // Ensure user profile is created and linked properly
        if (user.getUserProfile() == null) {
            UserProfile newProfile = new UserProfile();
            newProfile.setFullName(user.getUserName());
            user.setUserProfile(newProfile);
        }
        user.getUserProfile().setUser(user);

        // Assign default role USER if not assigned
        Optional<Role> userRole = roleRepository.findByRoleName(Role.RoleName.USER);
        userRole.ifPresent(user::setRole);

        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Set user as NOT verified initially
        user.setVerified(false);

        return userRepository.save(user);
    }


    /**
     * Finds a user by email.
     */
    public Optional<User> findUserByUserEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Finds a user by username.
     */
    public Optional<User> getUserUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    /**
     * Authenticates user and generates JWT token.
     */
    public ResponseEntity<Map<String, Object>> loginUser(String userNameOrEmail, String password) {
        try {
            User foundUser = userNameOrEmail.contains("@")
                    ? findUserByUserEmail(userNameOrEmail).orElseThrow(() -> new RuntimeException("User not found with email: " + userNameOrEmail))
                    : getUserUserName(userNameOrEmail).orElseThrow(() -> new RuntimeException("User not found with username: " + userNameOrEmail));

            if (!foundUser.isVerified()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Not Verified"));
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(foundUser.getUserName(), password)
            );

            if (!authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid username or password", "token", null));
            }

            String token = jwtService.generateToken(foundUser.getUserName());
            return ResponseEntity.ok(Map.of("message", "Hello " + foundUser.getUserName(), "token", token, "user", foundUser));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Something went wrong. Please try again later."));
        }
    }

    /**
     * Verifies a user using a token.
     */
    @Transactional
    public boolean verifyUser(String token) {
        User user = userRepository.findByVerificationToken(token).orElse(null);
        if (user == null) return false;

        user.setVerified(true);
        user.setVerificationToken(null);
        userRepository.save(user);
        return true;
    }

    /**
     * Deletes users who registered but never verified their email after 1 hour.
     */
    @Scheduled(fixedRate = 60000) // Runs every minute
    public void deleteUnverifiedUsers() {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        List<User> usersToDelete = userRepository.findByVerifiedFalseAndCreatedDateBefore(oneHourAgo);

        if (!usersToDelete.isEmpty()) {
            userRepository.deleteAll(usersToDelete);
            System.out.println("Deleted " + usersToDelete.size() + " unverified users.");
        }
    }

    /**
     * Resets password using a token.
     */
    public boolean resetPassword(String token, String newPassword) {
        Optional<User> user = userRepository.findByVerificationToken(token);
        if (user.isPresent()) {
            User u = user.get();
            u.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(u);
            return true;
        }
        return false;
    }
}
