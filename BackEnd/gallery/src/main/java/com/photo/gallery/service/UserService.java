package com.photo.gallery.service;

import com.photo.gallery.dtos.UserDTO;
import com.photo.gallery.dtos.UserDetailDTO;
import com.photo.gallery.model.Role;
import com.photo.gallery.model.User;
import com.photo.gallery.model.UserProfile;
import com.photo.gallery.repository.RoleRepository;
import com.photo.gallery.repository.UserProfileReposiotry;
import com.photo.gallery.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

    @Autowired
    UserProfileReposiotry userProfileReposiotry ;


    @Value("${GOOGLE_CLIENT_ID}")
    private String googleClientId;

    @Value("${GOOGLE_CLIENT_SECRET}")
    private String googleClientSecret;
    private final String REDIRECT_URI = "http://localhost:5173/auth/google/callback";

    /**
     * Retrieves all users from the database.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a user by ID and converts it to a DTO.
     */

    public UserDetailDTO getUserById(Long userId) {
        Optional<User> u = userRepository.findById(userId);
            User user = u.get();

        return new UserDetailDTO(
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.isVerified(),
                user.getRole(),
                user.getCreatedDate(),
                user.getUpdatedDate(),
                user.getUserProfile()
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

    public boolean changePassword(Long profileId, String newPassword) {
        Optional<UserProfile> userProfile = userProfileReposiotry.findById(profileId);
        UserProfile up =userProfile.get();
        if(up != null){
           Optional<User>  user = userRepository.findById(up.getUser().getUserId());
           User u = user.get();
           u.setPassword(passwordEncoder.encode(newPassword));
           userRepository.save(u);
           return true ;
        }
        return false ;
    }

    public boolean deleteVerifiedUser(Long id) {
        userRepository.deleteById(id);
        return true ;
    }


    /**
     * Exchanges the Google authorization code for an access token.
     */
    public String exchangeAuthCodeForAccessToken(String authCode) {
        String tokenUrl = "https://oauth2.googleapis.com/token";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String body = "code=" + authCode +
                "&client_id=" + googleClientId +
                "&client_secret=" + googleClientSecret +
                "&redirect_uri=" + REDIRECT_URI +
                "&grant_type=authorization_code";

        HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, requestEntity, Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return (String) response.getBody().get("access_token");
        }
        return null;
    }

    /**
     * Fetches Google user details using the access token.
     */
    public Map<String, Object> fetchGoogleUserInfo(String accessToken) {
        String userInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);

        return response.getStatusCode().is2xxSuccessful() ? response.getBody() : null;
    }

    /**
     * Finds an existing user by email or creates a new user with Google details.
     */
    public User findOrCreateGoogleUser(Map<String, Object> userInfo) {
        String email = (String) userInfo.get("email");

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return existingUser.get(); // Return existing user
        }

        // Create a new user if not found
        User newUser = new User();
        newUser.setUserName((String) userInfo.get("name"));
        newUser.setEmail(email);
        UserProfile userProfile = new UserProfile();
        userProfile.setFullName((String) userInfo.get("name"));
        userProfile.setUser(newUser);
        newUser.setUserProfile(userProfile);
        newUser.setVerified(true); // Google users are always verified

        // Assign default role (e.g., USER)
        Role userRole = roleRepository.findByRoleName(Role.RoleName.USER)
                .orElseThrow(() -> new RuntimeException("Default role not found"));
        newUser.setRole(userRole);

        return userRepository.save(newUser);
    }
}
