package com.photo.gallery.controller;

import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.photo.gallery.model.Album;
import com.photo.gallery.model.Photo;
import com.photo.gallery.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Map;

@RestController
@RequestMapping("/api/album")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    // Create a new album
    @PostMapping("/add/{id}")
    public ResponseEntity<?> createAlbum(@PathVariable Long id, @RequestBody Album album) {
        try {
            return ResponseEntity.ok(albumService.saveAlbum(id, album));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Add a photo to an album
    @PostMapping("/add-photo/{albumId}")
    public ResponseEntity<?> addPhotoToAlbum(
            @PathVariable Long albumId,
            @RequestBody Map<String, String> requestBody) {
        try {
            return ResponseEntity.ok(albumService.addToAlbum(albumId, requestBody.get("publicId")));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Get all albums for a profile sorted by createdAt
    @GetMapping("/all/{id}")
    public ResponseEntity<?> listAllAlbums(@PathVariable Long id, @RequestParam(defaultValue = "desc") String order) {
        try {
            return ResponseEntity.ok(albumService.getAllAlbum(id, order));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


    // Search for an album
    @GetMapping("/search/{id}/{albumName}")
    public ResponseEntity<?> searchAlbum(@PathVariable Long id, @PathVariable String albumName) {
        try {
            return ResponseEntity.ok(albumService.getAlbumByName(id, albumName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Rename an album
    @PutMapping("/rename/{albumName}")
    public ResponseEntity<?> renameAlbumName(@PathVariable String albumName, @RequestBody JsonNode jsonNode) {
        try {
            return ResponseEntity.ok(albumService.updateAlbumName(
                    jsonNode.get("profileId").asLong(),
                    albumName,
                    jsonNode.get("albumName").asText()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Get photos in an album
    @GetMapping("/get/photos/{id}")
    public ResponseEntity<?> getAlbumPhotoById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(albumService.getAlbumWithPhotos(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Move a photo from one album to another
    @PutMapping("/move-from-album")
    public ResponseEntity<String> movePhotoFromAlbum(@RequestParam String currAlbumName, @RequestParam String newAlbumName, @RequestParam Long profileId, @RequestParam Long photoId) {
        try {
            albumService.movePhotoFromAlbum(currAlbumName, newAlbumName, profileId, photoId);
            return ResponseEntity.ok("Photo moved successfully.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // Remove a photo from an album
    @DeleteMapping("/remove-from-album")
    public ResponseEntity<String> removePhotoFromAlbum(@RequestParam String albumName, @RequestParam Long profileId, @RequestParam String publicId) {
        try {
            albumService.removePhotoFromAlbum(albumName, profileId, publicId);
            return ResponseEntity.ok("Photo removed successfully.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // Delete an album
    @DeleteMapping("/delete/{id}/{albumName}")
    public ResponseEntity<?> deleteAlbum(@PathVariable Long id, @PathVariable String albumName) {
        try {
            return ResponseEntity.ok(albumService.removeAlbumByAlbumName(id, albumName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
