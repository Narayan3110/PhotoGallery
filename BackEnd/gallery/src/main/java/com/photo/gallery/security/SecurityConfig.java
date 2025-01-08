package com.photo.gallery.security;

import com.photo.gallery.model.Role;
import com.photo.gallery.model.User;
import com.photo.gallery.repository.RoleRepository;
import com.photo.gallery.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Controller;

import javax.sql.DataSource;
import java.util.Optional;

import static org.springframework.security.config.Customizer.withDefaults;

@Controller
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true ,
        securedEnabled = true ,
        jsr250Enabled = true)
public class SecurityConfig {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers("/contact/**").permitAll()
                .requestMatchers("/api/users/register").permitAll()
                .requestMatchers("api/admin/**").hasAuthority("ADMIN")
                .anyRequest().authenticated());
        http.csrf(AbstractHttpConfigurer::disable);
        http.httpBasic(withDefaults());  // Or you can use formLogin() depending on your requirements
        return http.build();
    }
    
    @Bean
    public CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if the USER role exists, otherwise create it
            Role userRole = roleRepository.findByRoleName(Role.RoleName.USER)
                    .orElseGet(() -> roleRepository.save(new Role(Role.RoleName.USER)));

            // Check if the ADMIN role exists, otherwise create it
            Role adminRole = roleRepository.findByRoleName(Role.RoleName.ADMIN)
                    .orElseGet(() -> roleRepository.save(new Role(Role.RoleName.ADMIN)));

            // Create a user with USER role if it doesn't exist
            if (!userRepository.existsByUserName("user1")) {
                // Encoding password before saving
                String encodedPassword = passwordEncoder.encode("password1");
                User user1 = new User("user1", "user1@example.com", encodedPassword);
                user1.setRole(userRole);  // Set the role correctly
                userRepository.save(user1); // Save the user
            }

            // Create an admin with ADMIN role if it doesn't exist
            if (!userRepository.existsByUserName("Admin1")) {
                // Encoding password before saving
                String encodedPassword = passwordEncoder.encode("Sanm@3004");
                User admin1 = new User("Admin1", "nikhil3004katoch@gmail.com", encodedPassword);
                admin1.setRole(adminRole);  // Set the role correctly
                userRepository.save(admin1); // Save the admin user
            }

        };
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        // Return an instance of BCryptPasswordEncoder
        return new BCryptPasswordEncoder();
    }
}
