package com.photo.gallery.controller;
<<<<<<< HEAD


import com.photo.gallery.model.User;
import com.photo.gallery.service.UserService;

=======
import com.photo.gallery.model.User;
import com.photo.gallery.service.UserService;
>>>>>>> 59cc755ddb6dfc7d994b60c90e075b5117cfc289
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
	
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User user) {
<<<<<<< HEAD
		User savedUser = userService.saveUser(user);
		return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String,String>> login(@RequestBody User user) {
		return userService.loginUser( user.getUserName(),user.getPassword());
	        
	}

=======
	    // Ensure the bidirectional relationship is set
		System.out.println(user);
	    if (user.getUserProfile() != null) {
	    	System.out.println(user.getUserProfile());
	        user.getUserProfile().setUser(user);  // Set the user in the userProfile
	    }
	    
	    // Save the user and profile
	    User savedUser = userService.saveUser(user);
	    return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}


	@PostMapping("/login")
	public ResponseEntity<Map<String,String>> login(@RequestBody User user) {
		return userService.loginUser( user.getUserName(),user.getPassword());
	        
	}

>>>>>>> 59cc755ddb6dfc7d994b60c90e075b5117cfc289
}
