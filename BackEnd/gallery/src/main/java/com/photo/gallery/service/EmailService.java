package com.photo.gallery.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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
    private UserRepository userRepository ;

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

}
