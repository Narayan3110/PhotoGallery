package com.photo.gallery.controller;
import com.photo.gallery.model.User;
import com.photo.gallery.model.UserProfile;
import com.photo.gallery.service.UserService;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
	
//	@PostMapping("/register")
//	public ResponseEntity<User> registerUser(@RequestBody User user) {
////		user.setUserProfile(null);
//	    // Ensure the bidirectional relationship is set
//		System.out.println(user);
//	    if (user.getUserProfile() != null) {
//	    	System.out.println(user.getUserProfile());
//	        user.getUserProfile().setUser(user); 
//	    }
//	    
//	    // Save the user and profile
//	    User savedUser = userService.saveUser(user);
//	    return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
//	}
	
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User user) {
	    // Log for debugging
	    System.out.println(user);
	    
	    // If user doesn't already have a profile, create one
	    if (user.getUserProfile() == null) {
	        UserProfile newProfile = new UserProfile();
	        newProfile.setFullName(user.getEmail()); // Set fullName as email
	        user.setUserProfile(newProfile); // Assign the new profile to user
	    }
	    
	    // Ensure bidirectional relationship is set
	    user.getUserProfile().setUser(user);  // Set the user in the userProfile
	    
	    // Save the user (this will also save the profile if cascading is set)
	    User savedUser = userService.saveUser(user);
	    
	    // Return the saved user as a response
	    return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}


	@PostMapping("/login")
	public ResponseEntity<Map<String,String>> login(@RequestBody User user) {
		return userService.loginUser( user.getUserName(),user.getPassword());
	        
	}

}
