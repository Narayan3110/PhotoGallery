package com.photo.gallery.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.photo.gallery.model.User;
import com.photo.gallery.repository.UserRepository;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    public void sendVerificationEmail(User savedUser) {
        // Generate a unique token
        String token = UUID.randomUUID().toString();

        // Set the token directly in the user entity
        savedUser.setVerificationToken(token);

        // Save the user with the token
        userRepository.save(savedUser);

        // Compose the verification URL
        String verificationUrl = "http://localhost:5173/verify?token=" + token;
        String subject = "Verify Your Email";
        String message = "Click the link below to verify your email:\n" + verificationUrl;

        // Send the email
        SimpleMailMessage emailMessage = new SimpleMailMessage();
        emailMessage.setTo(savedUser.getEmail());
        emailMessage.setSubject(subject);
        emailMessage.setText(message);

        mailSender.send(emailMessage);
    }

//  Rest Password Email
public ResponseEntity<String> sendResetPasswordEmail(String email) {
    Optional<User> user = userRepository.findByEmail(email);

    if (user.isPresent()) {
        // Generate a unique token
        String token = UUID.randomUUID().toString();

        User u = user.get();
        u.setVerificationToken(token);
        userRepository.save(u);

        // Compose the verification URL
        String verificationUrl = "http://localhost:5173/set-Password?token=" + token;
        String subject = "Reset Password Link";
        String message = "Click the link below to reset your password:\n" + verificationUrl;

        // Send the email
        SimpleMailMessage emailMessage = new SimpleMailMessage();
        emailMessage.setTo(u.getEmail());
        emailMessage.setSubject(subject);
        emailMessage.setText(message);

        mailSender.send(emailMessage);

        return new ResponseEntity<>("Email Sent", HttpStatus.OK);
    } else {
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
}
}