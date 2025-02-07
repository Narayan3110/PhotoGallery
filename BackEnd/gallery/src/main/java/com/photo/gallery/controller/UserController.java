package com.photo.gallery.controller;

import com.photo.gallery.model.User;
import com.photo.gallery.service.EmailService;
import com.photo.gallery.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final EmailService emailService;

    public UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    /**
     * Handles user registration and sends a verification email.
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) throws MessagingException {
        User savedUser = userService.saveUser(user);
        emailService.sendVerificationEmail(savedUser);
        return ResponseEntity.status(201).body("User registered. Please check your email to verify.");
    }

    /**
     * Handles user login and returns a JWT token if successful.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        return userService.loginUser(user.getUserName(), user.getPassword());
    }

    /**
     * Verifies the user's email based on the provided token.
     */
    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("token") String token) {
        return userService.verifyUser(token)
                ? ResponseEntity.ok("Email verified successfully! You can now log in.")
                : ResponseEntity.badRequest().body("Invalid or expired verification link.");
    }

    /**
     * Sends a password reset link to the provided email.
     */
    @PostMapping("/reset-email")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) throws MessagingException {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required.");
        }
        emailService.sendResetPasswordEmail(email);
        return ResponseEntity.ok("Password reset link sent successfully.");
    }

    /**
     * Resets the user's password using a token.
     */
    @GetMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam("token") String token, @RequestParam("newPassword") String newPassword) {
        return userService.resetPassword(token, newPassword)
                ? ResponseEntity.ok("Password changed successfully")
                : ResponseEntity.badRequest().body("Invalid token or user not found");
    }
}
