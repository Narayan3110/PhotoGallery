package com.photo.gallery.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "photo")
public class Photo {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long photoId ;
	
	//Fk pointing to userId of User class (Table name = users) cannot be null
	@ManyToOne
	@JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false) 
	private User userId ;
	
	//Fk pointing to albumId of Album class (Table name = albums) can be null
	@ManyToOne
	@JoinColumn(name = "albumId", referencedColumnName = "albumId", nullable = false) 
	private Album albumId ;
	
	//cannot be null and unique
	@Column(nullable = false, unique = true)
	private String fileName ;
	
	//cannot be null and unquie
	@Column(nullable = false, unique = true)
	private String photoUrl ;
	
	//cannot be null 
	@Column(nullable = false)
	private Long fileSize ;
	
	//cannot be null 
	@Column(nullable = false)
	private String photoType ;
	
	//cannot be null 
	@Column(nullable = false)
	private LocalDateTime uploadedAt ;

	public Long getPhotoId() {
		return photoId;
	}

	public void setPhotoId(Long photoId) {
		this.photoId = photoId;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	public Album getAlbumId() {
		return albumId;
	}

	public void setAlbumId(Album albumId) {
		this.albumId = albumId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public Long getFileSize() {
		return fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}

	public String getPhotoType() {
		return photoType;
	}

	public void setPhotoType(String photoType) {
		this.photoType = photoType;
	}

	public LocalDateTime getUploadedAt() {
		return uploadedAt;
	}

	public void setUploadedAt(LocalDateTime uploadedAt) {
		this.uploadedAt = uploadedAt;
	}

	public Photo(Long photoId, User userId, Album albumId, String fileName, String photoUrl, Long fileSize,
			String photoType, LocalDateTime uploadedAt) {
		super();
		this.photoId = photoId;
		this.userId = userId;
		this.albumId = albumId;
		this.fileName = fileName;
		this.photoUrl = photoUrl;
		this.fileSize = fileSize;
		this.photoType = photoType;
		this.uploadedAt = uploadedAt;
	}

	public Photo() {
		super();
	}
	
	
		
}
