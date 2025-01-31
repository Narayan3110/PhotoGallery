package com.photo.gallery.cloud;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dyiri0iy5",
                "api_key", "288398434539854",
                "api_secret", "LxGuymBKKwKldXopGwWY2jPUTQo"
        ));
    }
}
