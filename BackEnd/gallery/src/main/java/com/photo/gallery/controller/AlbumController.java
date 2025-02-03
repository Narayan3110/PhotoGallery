package com.photo.gallery.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.photo.gallery.model.Album;
import com.photo.gallery.service.AlbumService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/api/album")
public class AlbumController {
	
	@Autowired
	private AlbumService albumService;
	
	@PostMapping("/add/{id}")
	public ResponseEntity<?> createAlbum(
			@PathVariable Long id,
			@RequestBody Album album) {
		try{
			Album responseAlbum = albumService.saveAlbum(id,album);
			return ResponseEntity.ok(responseAlbum);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	@GetMapping("/search/{id}/{albumName}")
	public ResponseEntity<?> searchAlbum(
			@PathVariable String albumName ,
			@PathVariable Long id) {
		try {
	    Album album = albumService.getAlbumByName(id, albumName);
		    return ResponseEntity.ok(album);
	    }catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@PutMapping("/rename/{albumName}")
	public ResponseEntity<?> renameAlbumName(
			@PathVariable String albumName,
			@RequestBody JsonNode jsonNode) {
		try {
			// Extract the new album name and profileId from the request body
			String newAlbumName = jsonNode.get("albumName").asText();
			Long profileId = jsonNode.get("profileId").asLong();

			// Call the service layer to update the album name for the specific profile
			Album updatedAlbum = albumService.updateAlbumName(profileId, albumName, newAlbumName);

			// Return the updated album
			return ResponseEntity.ok(updatedAlbum);
		} catch (Exception e) {
			// Return an error response if something goes wrong
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}


	@GetMapping("/all/{id}")
	public ResponseEntity<?> listAllAlbums(@PathVariable Long id) {
		System.out.println("Profile Id :"+id);
		try{
			List<Album> albums = albumService.getAllAlbum(id);
		    return ResponseEntity.ok(albums);
		}catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@DeleteMapping("/delete/{id}/{albumName}")
	public ResponseEntity<?> deleteAlbum(
			@PathVariable Long id,
			@PathVariable String albumName) {
		try{
			String responseMessage = albumService.removeAlbumByAlbumName(id , albumName);
			return ResponseEntity.ok(responseMessage);
		}catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
	}
	
}
