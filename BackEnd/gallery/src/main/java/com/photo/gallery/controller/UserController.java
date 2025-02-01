package com.photo.gallery.controller;

import com.photo.gallery.model.User;
import com.photo.gallery.model.UserProfile;
import com.photo.gallery.service.UserService;
import com.photo.gallery.service.EmailService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (user.getUserProfile() == null) {
            UserProfile newProfile = new UserProfile();
            newProfile.setFullName(user.getUserName());
            user.setUserProfile(newProfile);
        }

        user.getUserProfile().setUser(user);
        
        // Save user but set `isVerified` as false initially
        User savedUser = userService.saveUser(user);
        
        // Send email verification link
        emailService.sendVerificationEmail(savedUser);

        return new ResponseEntity<>("User registered. Please check your email to verify.", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        return userService.loginUser(user.getUserName(), user.getPassword());
    }

    // ✅ New endpoint to verify email
    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("token") String token) {
        boolean isVerified = userService.verifyUser(token);
        return isVerified 
                ? ResponseEntity.ok("Email verified successfully! You can now log in.")
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired verification link.");
    }
}
