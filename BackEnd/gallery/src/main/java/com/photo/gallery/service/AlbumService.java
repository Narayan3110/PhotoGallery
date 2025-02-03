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

//		Save Album With ProfileId And Album
	public Album saveAlbum(Long profileId,Album album){
		List<Album> albums = getAllAlbum(profileId);
		if (!albums.isEmpty()) {
			for (Album al : albums) {
				if(al.getAlbumName().equals(album.getAlbumName())) {
			        throw new RuntimeException("Album Name:- "+album.getAlbumName()+" Already Present,try Again...");
				}
			}		
		}
        if (album.getUserProfile() == null) {
	        UserProfile newProfile = new UserProfile();
	        newProfile.setProfileId(profileId);
	        album.setUserProfile(newProfile);
        }
        Album responseAlbum = albumRepository.save(album);
        if (responseAlbum == null) {
	        throw new RuntimeException("There is Something Missing,Try Again Some time...");
	    }
        return responseAlbum;
	}
	
//	Add Photo to Album
	public Photo addToAlbum(Long profileId,Long photoId,String albumName) {
		Album album =getAlbumByName(profileId, albumName);
		
		Set<Photo> photos = album.getPhotos();
		for (Photo photo : photos) {
			if(photo.getPhotoId()==photoId){
		        throw new RuntimeException("Photo Already Present in Album");
			}
		}
		
		Photo photo = photoService.getPhotoById(profileId, photoId);
            // Fetch album by ID and associate it with the photo
                if (photo.getAlbums() == null) {
                    photo.setAlbums(new HashSet<>());
                }
                photo.getAlbums().add(album);  // Add the album to the photo
                photoRepository.save(photo);  // Save the photo with album association
		return photo;
	}
	
	
//	Get Album By AlbumId
	public Optional<Album> getAlbumById(Long albumId) {
		Optional<Album> album = albumRepository.findById(albumId);
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

//	Update Album Or Rename
	@Transactional
	public Album updateAlbumName(Long profileId, String albumName, String newAlbumName) {
		List<Album> albums=getAllAlbum(profileId);
		for (Album album : albums) {
			if (album.getAlbumName().equals(newAlbumName)) {
	        	throw  new RuntimeException("Album With name:- "+newAlbumName+" Is Already Present in Profile");
			}
		}
		Album album = getAlbumByName(profileId, albumName);
		album.setAlbumName(newAlbumName);
		return albumRepository.save(album);
	}

//	Get Album With ProfileId
	public  List<Album> getAllAlbum(Long profileId) {
		UserProfile profile = profileService.findByProfileId(profileId);
		List<Album> personalAlbums = new ArrayList<>();
		List<Album> albums = albumRepository.findAll();
		for (Album album : albums) {
			if (album.getUserProfile()==profile) {
				personalAlbums.add(album);
			}
		}
		return personalAlbums;
    }
	
//	Move Photo Album To another Album
	@Transactional
    public void movePhotoFromAlbum(String currAlbumName, String newAlbumName,Long profileId, Long photoId) {
		Photo photo = photoRepository.findById(photoId).orElseThrow(() -> new EntityNotFoundException("Photo with Id:- "+photoId+" not found"));
        Album currAlbum = getAlbumByName(profileId,currAlbumName);
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
	    
//	Remove Photo From albums
    @Transactional
    public void removePhotoFromAlbum(String albumName,Long profileId, Long photoId) {
    	Photo photo = photoRepository.findById(photoId).orElseThrow(() -> new EntityNotFoundException("Photo not found"));
    	// Fetching entities from the database
    	Album album = getAlbumByName(profileId,albumName);
        if (photo.getAlbums().isEmpty()) {
        	throw  new RuntimeException("Photo of id :- "+photoId+" is Not Associate with Any Album.");
		}else {
			Set<Album> photoAlbums = photo.getAlbums();
        
	        // Check if the photo is in the specified album
	        if (photoAlbums.contains(album)) {
	            // Remove the photo from the album
	            album.getPhotos().remove(photo);
	            photo.getAlbums().remove(album);
	            
	            // Save the updated entities to the database
	            albumRepository.save(album);
	            photoRepository.save(photo);
	        } else {
	            throw new RuntimeException("Photo of id :- " + photoId + " is Not Associated with Album :- " + albumName + " .");
	        }
		}
    }
	
//	Remove Entire Album.
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