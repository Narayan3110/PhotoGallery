package com.photo.gallery.cloud;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Value("${spring.cloudinary.cloud-name}")
    private String cloudName;

    @Value("${spring.cloudinary.api-key}")
    private String cloudKey;

    @Value("${spring.cloudinary.api-secret}")
    private String cloudSecret;

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", cloudKey,
                "api_secret", cloudSecret
        ));
    }
}
