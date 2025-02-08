package com.photo.gallery.service;

import java.util.*;
import java.util.stream.Collectors;

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

	// Save Album with ProfileId
	public Album saveAlbum(Long profileId, Album album) {
		validateAlbumName(profileId, album.getAlbumName());
		if (album.getUserProfile() == null) {
			UserProfile newProfile = new UserProfile();
			newProfile.setProfileId(profileId);
			album.setUserProfile(newProfile);
		}
		return albumRepository.save(album);
	}

	// Validate album name uniqueness
	private void validateAlbumName(Long profileId, String albumName) {

		List<Album> albums = getAllAlbums(profileId , "desc" );
		if (albums.stream().anyMatch(al -> al.getAlbumName().equals(albumName))) {
			throw new RuntimeException("Album name already exists.");
		}
	}

	// Add Photo to Album
	public Photo addToAlbum(Long albumId, String publicId) {
		Photo photo = photoRepository.findByPublicId(publicId).orElseThrow(() -> new RuntimeException("Photo not found"));
		Album album = albumRepository.getReferenceById(albumId);
		if (album.getPhotos().stream().anyMatch(p -> p.getPhotoId() == photo.getPhotoId())) {
			throw new RuntimeException("Photo already present in album");
		}
		photo.getAlbums().add(album);
		return photoRepository.save(photo);
	}

	// Get Album By Name
	public Album getAlbumByName(Long profileId, String albumName) {
		return getAllAlbums(profileId , "desc").stream()
				.filter(album -> album.getAlbumName().equals(albumName))
				.findFirst()
				.orElseThrow(() -> new RuntimeException("Album not found"));
	}

	// Update Album Name
	public Album updateAlbumName(Long profileId, String albumName, String newAlbumName) {
		Album album = getAlbumByName(profileId, albumName);
		album.setAlbumName(newAlbumName);
		return albumRepository.save(album);
	}

	// Get All Albums for Profile
//	public List<Album> getAllAlbum(Long profileId) {
//		UserProfile profile = profileService.findByProfileId(profileId);
//		return albumRepository.findAll().stream()
//				.filter(album -> album.getUserProfile().equals(profile))
//				.collect(Collectors.toList());
//	}
	public List<Album> getAllAlbums(Long profileId, String order) {
		if ("asc".equalsIgnoreCase(order)) {
			return albumRepository.findAllByProfileIdSortedAsc(profileId);
		} else {
			return albumRepository.findAllByProfileIdSortedDesc(profileId);
		}
	}

	// Get Album with Photos
	public Map<String, Object> getAlbumWithPhotos(Long albumId) {
		Album album = albumRepository.findById(albumId)
				.orElseThrow(() -> new RuntimeException("Album not found"));
		Map<String, Object> response = new HashMap<>();
		response.put("albumName", album.getAlbumName());
		response.put("createdAt", album.getCreatedAt());
		response.put("photos", album.getPhotos().stream()
				.map(photo -> Map.of("photoUrl", photo.getPhotoUrl(), "publicId", photo.getPublicId()))
				.collect(Collectors.toList()));
		return response;
	}

	// Move Photo from one album to another
	@Transactional
	public void movePhotoFromAlbum(String currAlbumName, String newAlbumName, Long profileId, Long photoId) {
		Photo photo = photoRepository.findById(photoId)
				.orElseThrow(() -> new RuntimeException("Photo not found"));
		Album currAlbum = getAlbumByName(profileId, currAlbumName);
		Album newAlbum = getAlbumByName(profileId, newAlbumName);
		currAlbum.getPhotos().remove(photo);
		newAlbum.getPhotos().add(photo);
		photo.getAlbums().remove(currAlbum);
		photo.getAlbums().add(newAlbum);
		albumRepository.save(currAlbum);
		albumRepository.save(newAlbum);
		photoRepository.save(photo);
	}

	// Remove Photo from Album
	@Transactional
	public void removePhotoFromAlbum(String albumName, Long profileId, String publicId) {
		Photo photo = photoRepository.findByPublicId(publicId)
				.orElseThrow(() -> new RuntimeException("Photo not found"));
		Album album = getAlbumByName(profileId, albumName);
		album.getPhotos().remove(photo);
		photo.getAlbums().remove(album);
		albumRepository.save(album);
		photoRepository.save(photo);
	}

	// Remove Album
	public String removeAlbumByAlbumName(Long profileId, String albumName) {
		Album album = getAlbumByName(profileId, albumName);
		album.getPhotos().forEach(photo -> removePhotoFromAlbum(albumName, profileId, photo.getPublicId()));
		albumRepository.delete(album);
		return "Album deleted successfully";
	}
}
