package com.photo.gallery.service;

import java.util.Optional;
import java.util.UUID;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.photo.gallery.model.User;
import com.photo.gallery.repository.UserRepository;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    public void sendVerificationEmail(User savedUser) throws MessagingException {
        // Generate a unique token
        String token = UUID.randomUUID().toString();

        // Set the token directly in the user entity
        savedUser.setVerificationToken(token);

        // Save the user with the token
        userRepository.save(savedUser);

        // Compose the verification URL
        String verificationUrl = "http://localhost:5173/verify?token=" + token;
        String subject = "Verify Your Email";

        // Create the HTML content for the email
        String htmlMessage = "<html><body>"
                + "<h3>Welcome to Photo Gallery!</h3>"
                + "<p>Dear " + savedUser.getUserName() + ",</p>"
                + "<p>Thank you for registering with us. Please click the link below to verify your email address:</p>"
                + "<a href='" + verificationUrl + "' style='background-color:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;'>Verify Your Email</a>"
                + "<p>If you did not register for this service, please ignore this email.</p>"
                + "<p>Best regards,<br/>The SnapSafe Team</p>"
                + "</body></html>";

        // Send the email with HTML content
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
        messageHelper.setTo(savedUser.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(htmlMessage, true); // Set HTML content

        mailSender.send(mimeMessage);
    }

    // Reset Password Email
    public ResponseEntity<String> sendResetPasswordEmail(String email) throws MessagingException {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            // Generate a unique token
            String token = UUID.randomUUID().toString();

            User u = user.get();
            u.setVerificationToken(token);
            userRepository.save(u);

            // Compose the verification URL
            String verificationUrl = "http://localhost:5173/set-Password?token=" + token;
            String subject = "Reset Your Password";

            // Create the HTML content for the email
            String htmlMessage = "<html><body>"
                    + "<h3>Password Reset Request</h3>"
                    + "<p>Dear " + u.getUserName() + ",</p>"
                    + "<p>We received a request to reset your password. Please click the link below to reset your password:</p>"
                    + "<a href='" + verificationUrl + "' style='background-color:#f44336;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;'>Reset Your Password</a>"
                    + "<p>If you did not request a password reset, please ignore this email.</p>"
                    + "<p>Best regards,<br/>The SnapSafe Team</p>"
                    + "</body></html>";

            // Send the email with HTML content
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setTo(u.getEmail());
            messageHelper.setSubject(subject);
            messageHelper.setText(htmlMessage, true); // Set HTML content

            mailSender.send(mimeMessage);

            return new ResponseEntity<>("Email Sent", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
}
