package com.photo.gallery.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.photo.gallery.model.UserProfile;
import com.photo.gallery.repository.UserProfileReposiotry;

@Service
public class UserProfileService {
	
	@Autowired
	private UserProfileReposiotry userProfileReposiotry ;
	
	public UserProfile findByProfileId(Long profileId) {
	    Optional<UserProfile> userProfile = userProfileReposiotry.findById(profileId);
	    
	    // Check if the UserProfile exists, if not throw an exception or handle the error
	    if (userProfile.isPresent()) {
	        return userProfile.get();
	    } else {
	        throw new RuntimeException("UserProfile not found for id: " + profileId);
	    }
	}
	
	// Method to update profile information (conditionally update based on input)
    public String updateUserProfile(Long profileId, String address, String contact, String fullName, String profileUrl,LocalDate dob, boolean removeProfile) {
        UserProfile userProfile = userProfileReposiotry.findById(profileId)
                .orElseThrow(() -> new RuntimeException("UserProfile not found"));

        // Update only the fields that are not null or empty
        if (address != null && !address.isEmpty()) {
            userProfile.setAddress(address);
        }
        if (contact != null && !contact.isEmpty()) {
            userProfile.setContact(contact);
        }
        if (fullName != null && !fullName.isEmpty()) {
            userProfile.setFullName(fullName);
        }
        if (profileUrl != null && !profileUrl.isEmpty()) {
            userProfile.setProfileUrl(profileUrl);
        }
        if (removeProfile) {
        	userProfile.setProfileUrl(null);
        }
        if (dob != null) {
        	userProfile.setDob(dob);
        }

        // Save updated profile
        userProfileReposiotry.save(userProfile);

        return "UserProfile updated successfully!";
    }

}
