package com.photo.gallery.controller;

import com.photo.gallery.service.UserProfileService;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/userprofile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    // Endpoint to update profile attributes
    @PutMapping("/update/{profileId}")
    public ResponseEntity<String> updateUserProfile(
            @PathVariable Long profileId,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) String contact,
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String profileUrl,
            @RequestParam(required = false) LocalDate dob) {
    	
    	System.out.println(profileId +" "+ address +" "+ fullName +" "+ profileUrl+" "+ dob);
        // Call the service to update the profile details
        String message = userProfileService.updateUserProfile(profileId, address, contact, fullName, profileUrl);

        // Return the response
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
