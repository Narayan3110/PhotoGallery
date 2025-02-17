package com.photo.gallery.controller;

import com.photo.gallery.model.User;
import com.photo.gallery.service.EmailService;
import com.photo.gallery.service.JWTService;
import com.photo.gallery.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final EmailService emailService;

    public UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    @Autowired
    private JWTService jwtService;

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

    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String, Object> request) {
        Long profileId = Long.parseLong(request.get("profileId").toString());
        String newPassword = request.get("newPassword").toString();

        boolean passwordChanged = userService.changePassword(profileId, newPassword);

        if (passwordChanged) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Password change failed");
        }
    }

    /**
     * Handles Google login by receiving an authorization code from the frontend,
     * exchanging it for an access token, and verifying or creating the user.
     */
    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        String authCode = request.get("code");
        if (authCode == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Authorization code is missing"));
        }

        // Exchange auth code for an access token
        String accessToken = userService.exchangeAuthCodeForAccessToken(authCode);
        if (accessToken == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to retrieve access token"));
        }

        // Fetch user details from Google
        Map<String, Object> userInfo = userService.fetchGoogleUserInfo(accessToken);
        if (userInfo == null || userInfo.get("email") == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to retrieve user information"));
        }

        // Check if user exists or create a new one
        User user = userService.findOrCreateGoogleUser(userInfo);

        // Generate JWT token
        String jwtToken = jwtService.generateToken(user.getUserName());

        return ResponseEntity.ok(Map.of(
                "token", jwtToken,
                "user", user
        ));
    }



}
