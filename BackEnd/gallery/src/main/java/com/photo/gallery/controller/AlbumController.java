package com.photo.gallery.controller;

import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.photo.gallery.model.Album;
import com.photo.gallery.model.Photo;
import com.photo.gallery.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/album")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    // Create a new album
    @PostMapping("/add/{id}")
    public ResponseEntity<?> createAlbum(@PathVariable Long id, @RequestBody Album album) {
        try {
            Album responseAlbum = albumService.saveAlbum(id, album);
            return ResponseEntity.ok(responseAlbum);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Add a photo to an album
    @PostMapping("/add/photo")
    public ResponseEntity<?> addPhotoToAlbum(
            @RequestParam("profile_id") Long profileId,
            @RequestParam("photo_id") Long photoId,
            @RequestParam("album_Name") String albumName) {
        try {
            Photo photo = albumService.addToAlbum(profileId, photoId, albumName);
            return ResponseEntity.ok(photo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Get an album by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getAlbumById(@PathVariable Long id) {
        Optional<Album> album = albumService.getAlbumById(id);
        if (album.isPresent()) {
        	return ResponseEntity.ok(album); 
        }else{
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Album of Id:- "+id+" Is Not Found");
        }
    }

    // Search for an album
    @GetMapping("/search/{id}/{albumName}")
    public ResponseEntity<?> searchAlbum(@PathVariable Long id, @PathVariable String albumName) {
        try {
            Album album = albumService.getAlbumByName(id, albumName);
            return ResponseEntity.ok(album);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Rename an album
    @PutMapping("/rename/{profileId}")
    public ResponseEntity<?> renameAlbumName(@PathVariable Long profileId, @RequestBody JsonNode jsonNode) {
        try {
        	String currAlbumName = jsonNode.get("currAlbumName").asText();
            String newAlbumName = jsonNode.get("newAlbumName").asText();
            Album updatedAlbum = albumService.updateAlbumName(profileId, currAlbumName, newAlbumName);
            return ResponseEntity.ok(updatedAlbum);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // List all albums for a profile
    @GetMapping("/all/{id}")
    public ResponseEntity<?> listAllAlbums(@PathVariable Long id) {
        try {
            List<Album> albums = albumService.getAllAlbum(id);
            return ResponseEntity.ok(albums);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Move a photo from one album to another
    @PutMapping("/move-from-album")
    public ResponseEntity<String> movePhotoFromAlbum(
            @RequestParam String currAlbumName,
            @RequestParam String newAlbumName,
            @RequestParam Long profileId,
            @RequestParam Long photoId) {
        if (currAlbumName.equals(newAlbumName)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Destination album should be different");
        }

        try {
            albumService.movePhotoFromAlbum(currAlbumName, newAlbumName, profileId, photoId);
            return ResponseEntity.ok("Photo moved from album: " + currAlbumName + " to " + newAlbumName + " successfully.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // Remove a photo from an album
    @DeleteMapping("/remove-from-album")
    public ResponseEntity<String> removePhotoFromAlbum(
            @RequestParam String albumName,
            @RequestParam Long profileId,
            @RequestParam Long photoId) {
        try {
            albumService.removePhotoFromAlbum(albumName, profileId, photoId);
            return ResponseEntity.ok("Photo removed from album successfully.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // Delete an album by name
    @DeleteMapping("/delete/{id}/{albumName}")
    public ResponseEntity<?> deleteAlbum(@PathVariable Long id, @PathVariable String albumName) {
        try {
            String responseMessage = albumService.removeAlbumByAlbumName(id, albumName);
            return ResponseEntity.ok(responseMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
