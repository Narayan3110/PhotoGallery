package com.photo.gallery.service;

import com.photo.gallery.dtos.UserDTO;
import com.photo.gallery.model.Role;
import com.photo.gallery.model.User;
import com.photo.gallery.repository.RoleRepository;
import com.photo.gallery.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

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
	
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDto(user);
    }


    public static UserDTO convertToDto(User user) {
        return new UserDTO(
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedDate(),
                user.getUpdatedDate()
        );
    }

    @Override
    public void updateUserRole(Long userId, String roleName) {
        // Fetch user by userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Convert roleName (String) to Role.RoleName enum
        Role.RoleName roleEnum;
        try {
            roleEnum = Role.RoleName.valueOf(roleName);  // Convert String to RoleName enum
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role name provided");
        }

        // Find the role by the RoleName enum
        Role role = roleRepository.findByRoleName(roleEnum)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Update the user's role
        user.setRole(role);
        userRepository.save(user);
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public void updatePassword(Long userId, String password) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Encode and set the new password
        user.setPassword(password);
        userRepository.save(user);
    }

    public User saveUser(User user){
        Optional<Role> userRole = roleRepository.findByRoleName(Role.RoleName.USER);
        userRole.ifPresent(user::setRole);
        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

	@Override
	public Optional<User> findUserByUserEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.findByEmail(email);
	}

	@Override
	public Optional<User> getUserUserName(String userName) {
		return userRepository.findByUserName(userName);
	}

	
	@Override
	public ResponseEntity<Map<String, Object>> loginUser(String userNameOrEmail, String password) {
	    try {
	        User foundUser;

	        // Determine if input is an email or a username
	        if (userNameOrEmail.contains("@")) {
	            foundUser = findUserByUserEmail(userNameOrEmail)
	                    .orElseThrow(() -> new RuntimeException("User not found with email: " + userNameOrEmail));
	        } else {
	            foundUser = getUserUserName(userNameOrEmail)
	                    .orElseThrow(() -> new RuntimeException("User not found with username: " + userNameOrEmail));
	        }

	        if (foundUser.isVerified()) {
	            // Authenticate user credentials
	            Authentication authentication = authenticationManager.authenticate(
	                    new UsernamePasswordAuthenticationToken(foundUser.getUserName(), password)
	            );

	            if (authentication.isAuthenticated()) {
	                String token = jwtService.generateToken(foundUser.getUserName());
	                Map<String, Object> response = new HashMap<>();
	                response.put("message", "Hello " + foundUser.getUserName());
	                response.put("token", token);
	                response.put("user", foundUser);
	                return ResponseEntity.ok(response);
	            } else {
	                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                        .body(Map.of("message", "Invalid username or password", "token", null));
	            }
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Not Verified"));
	        }
	    } catch (RuntimeException e) {
	        // Log exception details (better logging)
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body(Map.of("message", "Error during login: " + e.getMessage()));
	    } catch (Exception e) {
	        // Catch all other exceptions for a more generic error
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of("message", "Something went wrong. Please try again later."));
	    }
	}


	@Transactional
    public boolean verifyUser(String token) {
        // Find user by verification token
        User user = userRepository.findByVerificationToken(token).orElse(null);

        if (user == null) {
            // If the user with the given token doesn't exist, return false
            return false;
        }

        // Set the user as verified
        user.setVerified(true);

        // Optionally, clear the verification token after it's used
        user.setVerificationToken(null);

        // Save the updated user to the database
        userRepository.save(user);

        return true;
    }

    @Override
    @Scheduled(fixedRate = 60000) // Every minute
    public void deleteUnverifiedUsers() {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        List<User> usersToDelete = userRepository.findByVerifiedFalseAndCreatedDateBefore(oneHourAgo);

        if (!usersToDelete.isEmpty()) {
            userRepository.deleteAll(usersToDelete);
            // Optional: log the deletion or take additional actions as needed
            System.out.println("Deleted " + usersToDelete.size() + " unverified users.");
        }
    }

    @Override
    public boolean resetPassword(String token, String newPassword) {
        Optional<User> user = userRepository.findByVerificationToken(token);
        if(user.isPresent()){
            User u = user.get();
            u.setPassword(passwordEncoder.encode(newPassword));
            return true ;
        }
        return false;
    }


}
