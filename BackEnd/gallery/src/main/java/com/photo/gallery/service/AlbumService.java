package com.photo.gallery.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.photo.gallery.model.Album;
import com.photo.gallery.model.UserProfile;
import com.photo.gallery.repository.AlbumRepository;

@Service
public class AlbumService {

	@Autowired
    private AlbumRepository albumRepository;
	
	@Autowired
	private UserProfileService profileService;

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
	
	
//	public Album getAlbumByid(Long album_id) {
//		Album album = albumRepository.findById(album_id)
//				.orElseThrow(() -> new RuntimeException("Album not found With Album_ID"));
//		return album;
//	}
	
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
	public Album updateAlbumName(Long id , JsonNode jsonNode) {
		String currName=jsonNode.get("currName").asText();
		String newName=jsonNode.get("newName").asText();

		Album album = getAlbumByName(id, currName);
		if (album == null) {
	        throw new RuntimeException("Album with name:- "+currName+" Doesn't Exist Try Again..."); 
		}else {
			List<Album> albums = getAllAlbum(id);
			if (albums.isEmpty()) {
		        throw new RuntimeException("Albums of profileID :- "+id+" is Empty, Try Again...");
			}
			for (Album al : albums) {
				if(al.getAlbumName().equals(newName)) {
			        throw new RuntimeException("Album of name:- "+newName+" Already Present,try Again...");
				}
			}
			album.setAlbumName(newName);
			return albumRepository.save(album);
		}
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


	public String removeAlbumByAlbumName(Long id, String albumName) {
		Album fetchAlbum = getAlbumByName(id, albumName);
		albumRepository.delete(fetchAlbum);
		return "Album Was Deleted Successfully";
	}
	
	
	
}
