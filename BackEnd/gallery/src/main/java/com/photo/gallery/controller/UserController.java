package com.photo.gallery.controller;

import com.photo.gallery.dtos.UserDTO;
import com.photo.gallery.model.User;
import com.photo.gallery.service.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
    UserDTO dto ;
	
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User user) {
		User savedUser = userService.saveUser(user);
		return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
	    try {
	    	
	        // Extract username or email from the request
	        String userNameOrEmail = user.getUserName();
	        User foundUser;

	        // Determine if input is an email or a username
	        if (userNameOrEmail.contains("@")) {
	            // Find user by email
	            foundUser = userService.findUserByUserEmail(userNameOrEmail)
	                    .orElseThrow(() -> new RuntimeException("User not found with email: " + userNameOrEmail));
	        } else {
	            // Find user by username
	            foundUser = userService.getUserUserName(userNameOrEmail)
	                    .orElseThrow(() -> new RuntimeException("User not found with username: " + userNameOrEmail));
	        }
	        // Authenticate user credentials
	        Authentication authentication = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(
	                        foundUser.getUserName(), 
	                        user.getPassword()
	                )
	        );

	     // Prepare the response
	        dto.setUserId(foundUser.getUserId());
	        dto.setUserName(foundUser.getUserName());
	        dto.setEmail(foundUser.getEmail());
	        dto.setRole(foundUser.getRole());
	        dto.setCreatedDate(foundUser.getCreatedDate());
	        dto.setUpdatedDate(foundUser.getUpdatedDate());	        
	        Map<String, Object> response = new HashMap<>();
	        response.put("message", "Login successful! Welcome, " + dto.getUserName());
	        response.put("user", dto);

	        return ResponseEntity.ok(response);

	    } catch (Exception e) {
	    	Map<String, Object> errorResponse = new HashMap<>();
	        errorResponse.put("message", "Invalid username or password");
	        errorResponse.put("user", null);
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
	    }
	    
	}


}
