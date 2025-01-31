package com.photo.gallery.service;

import com.photo.gallery.dtos.UserDTO;
import com.photo.gallery.model.Role;
import com.photo.gallery.model.User;
import com.photo.gallery.repository.RoleRepository;
import com.photo.gallery.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
	            // Find user by email
	            foundUser = findUserByUserEmail(userNameOrEmail)
	                    .orElseThrow(() -> new RuntimeException("User not found with email: " + userNameOrEmail));
	        } else {
	            // Find user by username
	            foundUser = getUserUserName(userNameOrEmail)
	                    .orElseThrow(() -> new RuntimeException("User not found with username: " + userNameOrEmail));
	        }

	        // Authenticate user credentials
	        Authentication authentication = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(
	                        foundUser.getUserName(),
	                        password
	                )
	        );

	        if (authentication.isAuthenticated()) {
	            Map<String, Object> response = new HashMap<>();
	            String token = jwtService.generateToken(foundUser.getUserName());
	            response.put("message", "Hello Mr." + foundUser.getUserName());
	            response.put("token", token);
	            response.put("user", foundUser); // Adding user object to the response
	            return ResponseEntity.ok(response); // Return ResponseEntity with both user and token
	        } else {
	            Map<String, Object> errorResponse = new HashMap<>();
	            errorResponse.put("message", "Invalid username or password");
	            errorResponse.put("token", null); // Use `null` for the token in error case
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse); // Return error response with status 401
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Return bad request in case of any error
	    }
	}



	
}
