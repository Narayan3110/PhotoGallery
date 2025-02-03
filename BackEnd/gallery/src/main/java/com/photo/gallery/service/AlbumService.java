package com.photo.gallery.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.photo.gallery.repository.AlbumRepository;
import com.photo.gallery.repository.PhotoRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.photo.gallery.model.Album;
import com.photo.gallery.model.Photo;
import com.photo.gallery.model.UserProfile;

@Service
public class AlbumService {

	@Autowired
    private AlbumRepository albumRepository;
	
	@Autowired
	private PhotoRepository photoRepository;

	@Autowired
	private UserProfileService profileService;

	@Autowired
	private PhotoService photoService;

	//	Save Album
	public Album saveAlbum(Long id,Album album){
		List<Album> albums = getAllAlbum(id);
		if (!albums.isEmpty()) {
			for (Album al : albums) {
				if(al.getAlbumName().equals(album.getAlbumName())) {
			        throw new RuntimeException("Album Name:- "+album.getAlbumName()+" Already Present,try Again...");
				}
			}		
		}
		
        if (album.getUserProfile() == null) {
	        UserProfile newProfile = new UserProfile();
	        newProfile.setProfileId(id);
	        album.setUserProfile(newProfile);
	        
        }
        Album responseAlbum = albumRepository.save(album);
        if (responseAlbum == null) {
	        throw new RuntimeException(" Try Again Some time...");
	    }
        return responseAlbum;
	}
	
//	Add Photo to Album
	public Photo addToAlbum(Long profileId,Long photoId,String albumName) {
		Album album =getAlbumByName(profileId, albumName);
		Photo photo = photoService.getPhotoById(profileId, photoId);
            // Fetch album by ID and associate it with the photo
                if (photo.getAlbums() == null) {
                    photo.setAlbums(new HashSet<>());
                }
                photo.getAlbums().add(album);  // Add the album to the photo
                photoRepository.save(photo);  // Save the photo with album association
		return photo;
	}
	
	
	
	public Optional<Album> getAlbumById(Long album_id) {
		Optional<Album> album = albumRepository.findById(album_id);
		return album;
	}
	
//	find Album By AlbumName
	public Album getAlbumByName(Long id, String albumName) {
		List<Album> albums = getAllAlbum(id);
		if (albums.isEmpty()) {
	        throw new RuntimeException("Albums of profileID :- "+id+" is Empty, try Again...");
		}
		for (Album album : albums) {
			if(album.getAlbumName().equals(albumName)) {
				return album;  
			}
		}
        throw new RuntimeException("Album with name:- "+albumName+" Doesn't Exist Try Again..."); 
	}

//	Update Album
@Transactional
public Album updateAlbumName(Long profileId, String albumName, String newAlbumName) {
	// Find the album by the profileId and albumName
	Optional<Album> optionalAlbum = albumRepository.findByUserProfile_ProfileIdAndAlbumName(profileId, albumName);
//	if (!optionalAlbum.isPresent()) {
//		throw new AlbumNotFoundException("Album not found for profileId: " + profileId + " and albumName: " + albumName);
//	}

	// Get the album and update its name
	Album album = optionalAlbum.get();
	album.setAlbumName(newAlbumName);

	// Save the updated album back to the database
	return albumRepository.save(album);
}


	//	Get Album With Jwt Token
	public  List<Album> getAllAlbum(Long id) {
		UserProfile profile = profileService.findByProfileId(id);
		List<Album> personalAlbums = new ArrayList<>();
		List<Album> albums = albumRepository.findAll();
		for (Album album : albums) {
			if (album.getUserProfile()==profile) {
				personalAlbums.add(album);
			}
		}
		
		return personalAlbums;
    }
	
	 @Transactional
	    public void movePhotoFromAlbum(String currAlbumName, String newAlbumName,Long profileId, Long photoId) {
	    	 // Fetching entities from the database
	        Album currAlbum = getAlbumByName(profileId,currAlbumName);
	        Photo photo = photoRepository.findById(photoId).orElseThrow(() -> new EntityNotFoundException("Photo not found"));

	        
	        if (photo.getAlbums().isEmpty()) {
	        	throw  new RuntimeException("Photo of id :- "+photoId+" is Not Associate with Album :- "+currAlbumName+" .");
			}else {
				Album newAlbum = getAlbumByName(profileId,newAlbumName);
				Set<Album> album = photo.getAlbums();
				for (Album a : album) {
		            if (a.getAlbumName().equals(currAlbumName)) {

		            	// Modify the associations
		            	currAlbum.getPhotos().remove(photo);  // Removing photo from album
		    	        photo.getAlbums().remove(currAlbum);  // Removing album from photo
		    	        if (photo.getAlbums() == null) {
		    	        	photo.setAlbums(new HashSet<>());
		    	        }
		    	        photo.getAlbums().add(newAlbum);  // Add the newAlbum to the photo

		    	        // Save the updated entities to the database
		    	        albumRepository.save(currAlbum);
		    	        albumRepository.save(newAlbum);	    	        
	                    photoRepository.save(photo);  // Save the photo with album association
		                
		    	        
		            }else {
		            	throw  new RuntimeException("Photo of id :- "+photoId+" is Not Exist in Album id:- "+currAlbumName+" .");	                	            	
		            }
				}
			}		
		}
	    
	    
	    @Transactional
	    public void removePhotoFromAlbum(String albumName,Long profileId, Long photoId) {
	        // Fetching entities from the database
	    	Album album = getAlbumByName(profileId,albumName);
	    	Photo photo = photoRepository.findById(photoId).orElseThrow(() -> new EntityNotFoundException("Photo not found"));

	        
	        if (photo.getAlbums().isEmpty()) {
	        	throw  new RuntimeException("Photo of id :- "+photoId+" is Not Associate with Album :- "+albumName+" .");
			}else {
				Set<Album> album1 = photo.getAlbums();
				for (Album a : album1) {
		            if (a.getAlbumName().equals(albumName)) {
		            	// Modify the associations
		    			album.getPhotos().remove(photo);  // Removing photo from album
		    	        photo.getAlbums().remove(album);  // Removing album from photo

		    	        // Save the updated entities to the database
		    	        albumRepository.save(album);
		    	        photoRepository.save(photo);
		            }else {
		            	throw  new RuntimeException("Photo of id :- "+photoId+" is Not Exist in Album:- "+albumName+" .");	                	            	
		            }
				}
			}
	    }
	


	public String removeAlbumByAlbumName(Long profileId, String albumName) {
		Album fetchAlbum = getAlbumByName(profileId, albumName);
		
		Set<Photo> photos = fetchAlbum.getPhotos();
		
		for (Photo photo : photos) {
					removePhotoFromAlbum(albumName, profileId, photo.getPhotoId());
		}
		albumRepository.delete(fetchAlbum);
		return "Album Was Deleted Successfully";
	}
	
	
	
}